import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Star, IceCream, ShoppingCart, Heart, X, Plus, Minus, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCategories from "@/components/ProductCategories";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/lib/api";

// Import product images
import kesarPistaKulfi from "@/assets/products/kesar-pista-kulfi.png";
import mangoKulfi from "@/assets/products/mango-kulfi.png";
import roseKulfi from "@/assets/products/rose-kulfi.png";
import chocolateCone from "@/assets/products/chocolate-cone.png";
import butterscotchCone from "@/assets/products/butterscotch-cone.png";
import strawberryCone from "@/assets/products/strawberry-cone.png";
import vanillaCone from "@/assets/products/vanilla-cone.png";
import pistaKulfi from "@/assets/products/pista-kulfi.png";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user, token } = useAuth();

  const [backendSpecials, setBackendSpecials] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    category: "",
    description: "",
    price: "",
    image: "",
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);

  const featuredFlavorsStatic = [
    {
      id: "kesar-pista-home",
      name: "Kesar Pista Kulfi",
      description: "Royal saffron with crunchy pistachios",
      price: 60,
      category: "Featured",
      image: kesarPistaKulfi,
    },
    {
      id: "mango-kulfi-home",
      name: "Mango Kulfi",
      description: "Authentic Indian mango delight",
      price: 50,
      category: "Featured",
      image: mangoKulfi,
    },
    {
      id: "rose-kulfi-home",
      name: "Rose Kulfi",
      description: "Fragrant rose flavored kulfi",
      price: 50,
      category: "Featured",
      image: roseKulfi,
    },
    {
      id: "chocolate-cone-home",
      name: "Chocolate Cone",
      description: "Classic chocolate with real chocolate chips",
      price: 40,
      category: "Featured",
      image: chocolateCone,
    },
    {
      id: "butterscotch-cone-home",
      name: "Butterscotch Cone",
      description: "Creamy butterscotch with caramel sauce",
      price: 40,
      category: "Featured",
      image: butterscotchCone,
    },
    {
      id: "strawberry-cone-home",
      name: "Strawberry Cone",
      description: "Fresh strawberry ice cream delight",
      price: 35,
      category: "Featured",
      image: strawberryCone,
    },
    {
      id: "vanilla-cone-home",
      name: "Vanilla Cone",
      description: "Pure vanilla bean ice cream",
      price: 30,
      category: "Featured",
      image: vanillaCone,
    },
    {
      id: "pista-kulfi-home",
      name: "Pista Kulfi",
      description: "Rich pistachio flavored kulfi",
      price: 55,
      category: "Featured",
      image: pistaKulfi,
    },
  ];

  // Load special products from backend (displaySection = 'home' or 'specials')
  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        if (!res.ok || !data.success) return;

        const mapped = (data.products || [])
          .filter(
            (p: any) =>
              p.displaySection === "home" || p.displaySection === "specials"
          )
          .map((p: any) => ({
            id: `db-${p._id}`,
            productId: p._id,
            name: p.name,
            description: p.description || "",
            price: p.price,
            category: p.category || "Featured",
            image: p.image,
          }));

        setBackendSpecials(mapped);
      } catch (err) {
        // Fail silently for now; keep static specials
      }
    };

    fetchSpecials();
  }, []);

  const featuredFlavors = [...featuredFlavorsStatic, ...backendSpecials];

  const startEditProduct = (prod: any) => {
    if (!user || user.role !== "admin" || !prod.productId) return;
    setEditingProduct(prod);
    setEditForm({
      category: prod.category || "",
      description: prod.description || "",
      price: prod.price?.toString() || "",
      image: prod.image || "",
    });
  };

  const handleUploadEditImage = async (file: File | null) => {
    if (!token || !file) return;

    try {
      setIsUploadingEditImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch(
        `${API_URL}/api/upload/product-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.message || "Image upload failed");
      }

      setEditForm((prev) => ({ ...prev, image: uploadData.url }));
    } catch (err: any) {
      // ignore on home surface
    } finally {
      setIsUploadingEditImage(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!token || !editingProduct) return;

    try {
      setIsSavingEdit(true);
      const payload = {
        category: editForm.category,
        description: editForm.description,
        price: Number(editForm.price) || 0,
        image: editForm.image,
      };

      const res = await fetch(
        `${API_URL}/api/products/admin/${editingProduct.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update product");
      }

      setBackendSpecials((prev) =>
        prev.map((item: any) =>
          item.productId === editingProduct.productId
            ? { ...item, ...payload, price: payload.price }
            : item
        )
      );
      setEditingProduct(null);
    } catch (err: any) {
      // ignore on home surface
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
    
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Product Categories */}
      <ProductCategories />

      {/* Featured Flavors */}
      <section className="container mx-auto px-2 py-10">
        <div className="text-center space-y-2 mb-10">
          {/* <div className="inline-flex items-center gap-2 text-primary">
            <Star className="w-5 h-5 fill-primary" />
            <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
          </div> */}
          <h2 className="text-4xl font-bold text-foreground">Our Special Flavors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked favorites that bring the taste of India to your palate <br/>
            “भारत का असली स्वाद, खास आपके लिए चुना हुआ।”
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredFlavors.map((flavor) => (
            <Card 
              key={flavor.id}
              className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 relative group"
              style={{ 
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-soft)"
              }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 z-10 rounded-full transition-all ${
                    isFavorite(flavor.id) 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white/80 hover:bg-white text-gray-600'
                  }`}
                  onClick={() => toggleFavorite(flavor.id)}
                >
                  <Heart 
                    className={`w-5 h-5 transition-all ${
                      isFavorite(flavor.id) ? 'fill-current' : ''
                    }`}
                  />
                </Button>

                <div
                  className="aspect-square bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center p-4 overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
                  onClick={() => {
                    setSelectedProduct(flavor);
                    setQuantity(1);
                  }}
                >
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-contain animate-float drop-shadow-lg"
                  />

                  {user?.role === "admin" && (flavor as any).productId && (
                    <div
                      className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 backdrop-blur-[1px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditProduct(flavor);
                      }}
                    >
                      <div className="absolute top-2 right-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-black shadow">
                        Edit image & details
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{flavor.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{flavor.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
                    <p className="text-xl md:text-2xl font-bold text-primary">₹{flavor.price}</p>
                    <Button 
                      onClick={() => addToCart(flavor)}
                      className="rounded-full w-full sm:w-auto"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/menu">
              View Full Menu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Preview Sheet */}
      <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <SheetContent 
          side="bottom" 
          className="h-[95vh] md:h-[90vh] p-0 rounded-t-3xl overflow-hidden md:max-w-5xl md:mx-auto md:mb-8 md:rounded-3xl"
        >
          {selectedProduct && (
            <div className="h-full flex flex-col md:flex-row">
              {/* Header with Close Button - Mobile Only */}
              <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 px-6 py-4 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Package className="w-4 h-4" />
                  <span>Product Details</span>
                </div>
              </div>

              {/* Product Image Section - Desktop Only */}
              <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20 p-12 flex items-center justify-center h-full min-h-[600px] w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-6 right-6 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 shadow-lg z-20"
                    onClick={() => setSelectedProduct(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <div className="relative w-full max-w-md aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 dark:from-pink-800 dark:via-purple-800 dark:to-indigo-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="relative w-full h-full object-contain drop-shadow-2xl animate-float z-10"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="flex-1 md:w-1/2 flex flex-col overflow-y-auto">
                {/* Product Image - Mobile Only */}
                <div className="md:hidden relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20 p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 dark:from-pink-800 dark:via-purple-800 dark:to-indigo-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="relative w-full h-full object-contain drop-shadow-2xl animate-float z-10"
                    />
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Category & Name */}
                  <div className="space-y-3">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none px-3 py-1">
                      {selectedProduct.category}
                    </Badge>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">4.8</span>
                    <span className="text-xs text-muted-foreground">(125 reviews)</span>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-center justify-between p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-primary/10">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price per piece</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{selectedProduct.price}
                      </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                      <p className="text-xs text-green-700 dark:text-green-400 font-semibold">In Stock</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Select Quantity
                    </label>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-2xl border-2 border-primary/20">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full border-2 hover:bg-primary hover:text-white transition-all"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <span className="text-3xl font-bold w-16 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full border-2 hover:bg-primary hover:text-white transition-all"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold text-primary">₹{selectedProduct.price * quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Bottom Actions */}
                <div className="border-t bg-white dark:bg-gray-950 p-6 space-y-3 mt-auto">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-2xl border-2 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart className={`w-6 h-6 ${isFavorite(selectedProduct.id) ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all"
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          addToCart(selectedProduct);
                        }
                        setSelectedProduct(null);
                        setQuantity(1);
                      }}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add {quantity} to Cart • ₹{selectedProduct.price * quantity}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    {/* 🎉 Free delivery on orders above ₹500 */}
                  </p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Admin edit modal for backend products */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update image, category, description, and price. Changes reflect immediately.
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-white to-blue-50">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={editForm.image || editingProduct.image}
                    alt={editingProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px] flex items-center justify-center">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sm font-medium shadow">
                    {isUploadingEditImage ? "Uploading..." : "Replace image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleUploadEditImage(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label>Category</Label>
                  <Input
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="e.g., Cones"
                  />
                </div>

                <div className="grid gap-1">
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Short product description"
                  />
                </div>

                <div className="grid gap-1">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="120"
                  />
                </div>
              </div>

              <DialogFooter className="mt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                  disabled={isSavingEdit}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} disabled={isSavingEdit}>
                  {isSavingEdit ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

     
    </div>
  );
};

export default Home;

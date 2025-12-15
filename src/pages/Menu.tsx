import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
import {
  IceCream,
  ShoppingCart,
  Heart,
  X,
  Plus,
  Minus,
  Star,
  Package,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/lib/api";

import kesarPistaKulfi from "@/assets/products/kesar-pista-kulfi.png";
import mangoKulfi from "@/assets/products/mango-kulfi.png";
import roseKulfi from "@/assets/products/rose-kulfi.png";
import chocolateCone from "@/assets/products/chocolate-cone.png";
import strawberryCone from "@/assets/products/strawberry-cone.png";
import familyCup from "@/assets/products/family-cup.png";
import vanillaCone from "@/assets/products/vanilla-cone.png";
import butterscotchCone from "@/assets/products/butterscotch-cone.png";
import pistaKulfi from "@/assets/products/pista-kulfi.png";
import malaiKulfi from "@/assets/products/malai-kulfi.png";
import chocoVanillaCone from "@/assets/products/choco-vanilla-cone.png";
import chocolateBar from "@/assets/products/chocolate-bar.png";
import mangoBar from "@/assets/products/mango-bar.png";
import vanillaBar from "@/assets/products/vanilla-bar.png";
import strawberryBar from "@/assets/products/strawberry-bar.png";
import orangeBar from "@/assets/products/orange-bar.png";
import iceCreamCake from "@/assets/products/ice-cream-cake.png";
import iceSandwich from "@/assets/products/ice-sandwich.png";
import twistPop from "@/assets/products/twist-pop.png";

const Menu = () => {
  const categories = ["All", "Cones", "Cups", "Sundaes", "Family Packs"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { user, token } = useAuth();

  const [backendMenuItems, setBackendMenuItems] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    category: "",
    description: "",
    price: "",
    image: "",
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);

  const staticMenuItems = [
    {
      id: "kesar-pista-cone",
      name: "Kesar Pista Kulfi",
      category: "Cones",
      price: 120,
      image: kesarPistaKulfi,
      description: "Royal saffron with crunchy pistachios in a crispy cone",
    },
    {
      id: "mango-kulfi-cup",
      name: "Mango Kulfi Cup",
      category: "Cups",
      price: 100,
      image: mangoKulfi,
      description: "Authentic Indian mango delight served in a cup",
    },
    {
      id: "rose-falooda-sundae",
      name: "Rose Kulfi Sundae",
      category: "Sundaes",
      price: 180,
      image: roseKulfi,
      description: "Fragrant rose with vermicelli, nuts, and toppings",
    },
    {
      id: "chocolate-chip-cone",
      name: "Chocolate Cone",
      category: "Cones",
      price: 90,
      image: chocolateCone,
      description: "Classic chocolate with real chocolate chips",
    },
    {
      id: "strawberry-cup",
      name: "Strawberry Cone",
      category: "Cups",
      price: 80,
      image: strawberryCone,
      description: "Fresh strawberry ice cream in a convenient cup",
    },
    {
      id: "family-pack-variety",
      name: "Family Pack Variety",
      category: "Family Packs",
      price: 500,
      image: familyCup,
      description: "1L tub with 4 different flavors of your choice",
    },
    {
      id: "vanilla-cone",
      name: "Vanilla Cone",
      category: "Cones",
      price: 70,
      image: vanillaCone,
      description: "Classic vanilla in a crispy wafer cone",
    },
    {
      id: "butterscotch-sundae",
      name: "Butterscotch Cone",
      category: "Sundaes",
      price: 160,
      image: butterscotchCone,
      description: "Creamy butterscotch with caramel sauce and nuts",
    },
    {
      id: "pista-kulfi-cone",
      name: "Pista Kulfi",
      category: "Cones",
      price: 130,
      image: pistaKulfi,
      description: "Rich pistachio kulfi with real crushed pistachios",
    },
    {
      id: "malai-kulfi-cup",
      name: "Malai Kulfi Cup",
      category: "Cups",
      price: 110,
      image: malaiKulfi,
      description: "Creamy traditional malai kulfi in a cup",
    },
    {
      id: "choco-vanilla-cone",
      name: "Choco Vanilla Twist Cone",
      category: "Cones",
      price: 95,
      image: chocoVanillaCone,
      description: "Perfect blend of chocolate and vanilla in one cone",
    },
    {
      id: "chocolate-bar",
      name: "Chocolate Ice Bar",
      category: "Cups",
      price: 60,
      image: chocolateBar,
      description: "Rich chocolate ice cream on a stick",
    },
    {
      id: "mango-bar",
      name: "Mango Ice Bar",
      category: "Cups",
      price: 60,
      image: mangoBar,
      description: "Refreshing mango ice bar, perfect for summer",
    },
    {
      id: "vanilla-bar",
      name: "Vanilla Ice Bar",
      category: "Cups",
      price: 55,
      image: vanillaBar,
      description: "Classic vanilla ice cream bar",
    },
    {
      id: "strawberry-bar",
      name: "Strawberry Ice Bar",
      category: "Cups",
      price: 60,
      image: strawberryBar,
      description: "Fresh strawberry ice cream on a stick",
    },
    {
      id: "orange-bar",
      name: "Orange Ice Bar",
      category: "Cups",
      price: 55,
      image: orangeBar,
      description: "Tangy orange ice bar, refreshingly cool",
    },
    {
      id: "ice-cream-cake",
      name: "Ice Cream Cake",
      category: "Family Packs",
      price: 800,
      image: iceCreamCake,
      description: "Delicious 1kg ice cream cake for celebrations",
    },
    {
      id: "ice-sandwich",
      name: "Ice Cream Sandwich",
      category: "Sundaes",
      price: 85,
      image: iceSandwich,
      description: "Vanilla ice cream between two chocolate cookies",
    },
    {
      id: "twist-pop",
      name: "Twist Pop",
      category: "Cups",
      price: 50,
      image: twistPop,
      description: "Fun twisted ice pop with dual flavors",
    },
  ];

  useEffect(() => {
    const fetchMenuProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        if (!res.ok || !data.success) return;

        const mapped = (data.products || [])
          .filter((p: any) => p.displaySection === "products")
          .map((p: any) => ({
            id: `db-${p._id}`,
            productId: p._id,
            name: p.name,
            category: p.category === "Cones" ? "Cones" : "Cups",
            price: p.price,
            image: p.image,
            description: p.description || "",
          }));

        setBackendMenuItems(mapped);
      } catch {
        // ignore errors and keep static menu
      }
    };

    fetchMenuProducts();
  }, []);

  const menuItems = [...staticMenuItems, ...backendMenuItems];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const favoriteItems = menuItems.filter((item) => isFavorite(item.id));
  const displayItems = activeTab === "favorites" ? favoriteItems : filteredItems;

  const startEditProduct = (item: any) => {
    if (!user || user.role !== "admin" || !item.productId) return;
    setEditingProduct(item);
    setEditForm({
      category: item.category || "",
      description: item.description || "",
      price: item.price?.toString() || "",
      image: item.image || "",
    });
  };

  const handleUploadEditImage = async (file: File | null) => {
    if (!token || !file) return;

    try {
      setIsUploadingEditImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch(`${API_URL}/api/upload/product-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.message || "Image upload failed");
      }

      setEditForm((prev) => ({ ...prev, image: uploadData.url }));
    } catch {
      // silent fail here
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

      setBackendMenuItems((prev) =>
        prev.map((p: any) =>
          p.productId === editingProduct.productId
            ? { ...p, ...payload, price: payload.price }
            : p
        )
      );
      setEditingProduct(null);
    } catch {
      // silent fail here
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

          <div className="relative text-center space-y-4 animate-fade-in">
            <div className="inline-block">
              <Badge className="mb-4 text-sm px-4 py-1.5 bg-gradient-to-r from-primary to-secondary border-0 text-white">
                Low Price Premium Quality
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Special Flavors
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our handcrafted collection of premium ice creams. Each flavor is made with 100% natural ingredients and lots of love! 🍦✨
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/20">
            <TabsTrigger
              value="all"
              className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all"
            >
              <IceCream className="w-4 h-4 mr-2" />
              All Products
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all"
            >
              <Heart className="w-4 h-4 mr-2" />
              My Favorites
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white text-primary shadow-lg">
                  {favorites.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              Browse by Category
              <span className="w-8 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-2 font-semibold transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                      : "hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "favorites" && favoriteItems.length === 0 && (
          <div className="text-center py-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-3">No Favorites Yet</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Start adding your favorite ice creams by clicking the heart icon!
            </p>
            <Button
              onClick={() => setActiveTab("all")}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <IceCream className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </div>
        )}

        {displayItems.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                {activeTab === "favorites"
                  ? "Your Favorite Treats"
                  : activeCategory === "All"
                  ? "All Our Products"
                  : activeCategory}
              </h2>
              <p className="text-muted-foreground mt-2">
                {displayItems.length} delicious {displayItems.length === 1 ? "option" : "options"} available
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative group border-2 border-transparent hover:border-primary/20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,240,245,0.9) 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent className="p-5 space-y-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-4 right-4 z-10 rounded-full transition-all ${
                        isFavorite(item.id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white/80 hover:bg-white text-gray-600"
                      }`}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          isFavorite(item.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>

                    <div
                      className="aspect-square bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center p-4 overflow-hidden cursor-pointer hover:scale-105 transition-transform relative"
                      onClick={() => {
                        setSelectedProduct(item);
                        setQuantity(1);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain animate-float drop-shadow-lg"
                      />

                      {user?.role === "admin" && (item as any).productId && (
                        <div
                          className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 backdrop-blur-[1px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditProduct(item);
                          }}
                        >
                          <div className="absolute top-2 right-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-black shadow">
                            Edit image & details
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="inline-block px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium">
                          {item.category}
                        </div>
                        {isFavorite(item.id) && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                            Favorite
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                        <Button size="sm" onClick={() => addToCart(item)} className="rounded-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <SheetContent
          side="bottom"
          className="h-[95vh] md:h-[90vh] p-0 rounded-t-3xl overflow-hidden md:max-w-5xl md:mx-auto md:mb-8 md:rounded-3xl"
        >
          {selectedProduct && (
            <div className="h-full flex flex-col md:flex-row">
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

              <div className="flex-1 md:w-1/2 flex flex-col overflow-y-auto">
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

                  <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">4.8</span>
                    <span className="text-xs text-muted-foreground">(125 reviews)</span>
                  </div>

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

                <div className="border-t bg-white dark:bg-gray-950 p-6 space-y-3 mt-auto">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-2xl border-2 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isFavorite(selectedProduct.id) ? "fill-current text-red-500" : ""
                        }`}
                      />
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
                    🎉 Free delivery on orders above ₹500
                  </p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

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
                      onChange={(e) => handleUploadEditImage(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label>Category</Label>
                  <Input
                    value={editForm.category}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Cones"
                  />
                </div>

                <div className="grid gap-1">
                  <Label>Description</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
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
                    onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="120"
                  />
                </div>
              </div>

              <DialogFooter className="mt-2">
                <Button variant="outline" onClick={() => setEditingProduct(null)} disabled={isSavingEdit}>
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

export default Menu;

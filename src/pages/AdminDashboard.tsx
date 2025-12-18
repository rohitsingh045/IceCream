import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  TrendingUp,
  Search,
  Filter,
  Loader2,
  Trash,
  Upload,
  IceCream,
  Sparkles,
  Star,
  Crown,
  Package,
  Gift,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

interface OrderItem {
  productSlug: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: string;
  totalAmount: number;
  orderStatus: string;
  cancelledBy?: string | null;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  displaySection?: string;
  description?: string;
}

interface NewProduct {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  displaySection: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null
  );
  const [editForm, setEditForm] = useState({
    category: "",
    description: "",
    price: "",
    image: "",
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    category: "Ice Cream",
    price: "",
    image: "",
    description: "",
    displaySection: "products",
  });

  // -------------------------------
  // Redirect non-logged in / non-admin users
  // -------------------------------
  useEffect(() => {
    if (!token) return;

    if (!isAuthenticated) {
      toast.error("Please login as admin");
      navigate("/login");
      return;
    }

    if (user && user.role !== "admin") {
      toast.error("You are not authorized to view admin dashboard");
      navigate("/");
      return;
    }

    fetchOrders();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuthenticated, user]);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/api/orders/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
      setFilteredOrders(data.orders);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);

      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // -------------------------------
  // Filter Logic
  // -------------------------------
  useEffect(() => {
    let list = [...orders];

    if (statusFilter !== "all") {
      list = list.filter((o) => o.orderStatus === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o._id.toLowerCase().includes(term) ||
          o.shippingAddress.fullName.toLowerCase().includes(term) ||
          o.shippingAddress.email.toLowerCase().includes(term) ||
          o.shippingAddress.phone.includes(term)
      );
    }

    setFilteredOrders(list);
  }, [orders, searchTerm, statusFilter]);

  // -------------------------------
  // Update Order Status
  // -------------------------------
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update order status");
      }

      toast.success("Order status updated");
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Failed to update order status");
    }
  };

  // -------------------------------
  // Delete Order (Admin only)
  // -------------------------------
  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete order");
      }

      toast.success("Order deleted successfully");
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete order");
    }
  };

  // -------------------------------
  // Create New Product (Admin only)
  // -------------------------------
  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error("Please fill name, category and price");
      return;
    }

    const priceNumber = Number(newProduct.price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      toast.error("Price must be a valid positive number");
      return;
    }

    try {
      setIsCreatingProduct(true);
      const res = await fetch(
        `${API_URL}/api/products/admin/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newProduct.name,
            category: newProduct.category,
            price: priceNumber,
            image: newProduct.image || undefined,
            description: newProduct.description || undefined,
            displaySection: newProduct.displaySection || "products",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create product");
      }

      toast.success("Product created successfully");
      setNewProduct({
        name: "",
        category: "Ice Cream",
        price: "",
        image: "",
        description: "",
        displaySection: "products",
      });
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    } finally {
      setIsCreatingProduct(false);
    }
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!token) {
      toast.error("You must be logged in as admin to upload images");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploadingImage(true);
      const res = await fetch(
        `${API_URL}/api/upload/product-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image");
      }

      setNewProduct((prev) => ({ ...prev, image: data.url }));
      toast.success("Image uploaded successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleChangeProductImage = async (
    productId: string,
    file: File | null
  ) => {
    if (!file) return;
    if (!token) {
      toast.error("You must be logged in as admin to upload images");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUpdatingProductId(productId);

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
        throw new Error(uploadData.message || "Failed to upload image");
      }

      const updateRes = await fetch(
        `${API_URL}/api/products/admin/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: uploadData.url }),
        }
      );

      const updateData = await updateRes.json();

      if (!updateRes.ok || !updateData.success) {
        throw new Error(updateData.message || "Failed to update product");
      }

      toast.success("Product image updated");
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to update product image");
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleRemoveProductImage = async (productId: string) => {
    if (!token) return;

    try {
      setUpdatingProductId(productId);

      const placeholder =
        "https://via.placeholder.com/400x300?text=Product+Image";

      const res = await fetch(
        `${API_URL}/api/products/admin/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: placeholder }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to remove image");
      }

      toast.success("Product image removed");
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to remove product image");
    } finally {
      setUpdatingProductId(null);
    }
  };

  // -------------------------------
  // Edit Modal Handlers
  // -------------------------------
  const startEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setEditForm({
      category: product.category || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      image: product.image || "",
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
      toast.error(err.message || "Failed to upload image");
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
        `${API_URL}/api/products/admin/${editingProduct._id}`,
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

      // Update local list instantly
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProduct._id
            ? { ...p, ...payload, price: payload.price }
            : p
        )
      );

      toast.success("Product updated");
      setEditingProduct(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // -------------------------------
  // Status Badge Colors
  // -------------------------------
  const getStatusBadge = (status: string, cancelledBy?: string | null) => {
    const map: Record<
      string,
      { className: string; label: string; icon: any }
    > = {
      pending: {
        className: "bg-yellow-100 text-yellow-800",
        label: "Pending",
        icon: Clock,
      },
      confirmed: {
        className: "bg-blue-100 text-blue-800",
        label: "Confirmed",
        icon: CheckCircle2,
      },
      processing: {
        className: "bg-purple-100 text-purple-800",
        label: "Processing",
        icon: ShoppingCart,
      },
      shipped: {
        className: "bg-indigo-100 text-indigo-800",
        label: "Shipped",
        icon: Truck,
      },
      delivered: {
        className: "bg-green-100 text-green-800",
        label: "Delivered",
        icon: CheckCircle2,
      },
      cancelled: {
        className: "bg-red-100 text-red-800",
        label: cancelledBy === "user" ? "Cancelled by User" : "Cancelled",
        icon: XCircle,
      },
    };

    const cfg = map[status] || map.pending;
    const Icon = cfg.icon;

    return (
      <Badge className={`${cfg.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {cfg.label}
      </Badge>
    );
  };

  // -------------------------------
  // Stats
  // -------------------------------
  const stats = {
    totalOrders: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    confirmed: orders.filter((o) => o.orderStatus === "confirmed").length,
    revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  // -------------------------------
  // Loader
  // -------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-pink-500" />
            <IceCream className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-600" />
          </div>
          <p className="mt-4 text-pink-600 font-medium">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------
  // JSX Return
  // -------------------------------
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 relative overflow-hidden">
      {/* Floating Ice Cream Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30" style={{ animationDuration: '3s' }}>🍦</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce opacity-25" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍨</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-bounce opacity-20" style={{ animationDuration: '5s', animationDelay: '2s' }}>🍧</div>
        <div className="absolute bottom-40 right-10 text-4xl animate-bounce opacity-30" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🧁</div>
        <div className="absolute top-1/3 left-1/4 text-5xl animate-pulse opacity-20" style={{ animationDuration: '4s' }}>🍩</div>
        <div className="absolute top-1/2 right-1/3 text-6xl animate-pulse opacity-25" style={{ animationDuration: '3s' }}>🎂</div>
        <div className="absolute bottom-1/3 left-1/2 text-4xl animate-bounce opacity-20" style={{ animationDuration: '4.5s' }}>🍰</div>
        <div className="absolute top-2/3 right-1/4 text-5xl animate-pulse opacity-25" style={{ animationDuration: '5s' }}>🍭</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-lg">
              <IceCream className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            Manage all customer orders – accept, reject, and track status
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </p>
        </div>

        {/* ADD PRODUCT (ADMIN ONLY) - LEFT SECTION */}
        <div className="mb-8">
          {!showProductForm ? (
            <Button 
              onClick={() => setShowProductForm(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          ) : (
            <div className="max-w-xl">
              <Card className="backdrop-blur-sm bg-white/70 border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Add New Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleCreateProduct}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        name="name"
                        value={newProduct.name}
                        onChange={handleProductChange}
                        placeholder="Product name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(val) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            category: val,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ice Cream">Ice Cream</SelectItem>
                          <SelectItem value="Kulfi">Kulfi</SelectItem>
                          <SelectItem value="Cones">Cones</SelectItem>
                          <SelectItem value="Special">Special</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={handleProductChange}
                        placeholder="230"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Display On</label>
                      <Select
                        value={newProduct.displaySection}
                        onValueChange={(val) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            displaySection: val,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Page</SelectItem>
                          <SelectItem value="specials">
                            Our Special Flavours
                          </SelectItem>
                          <SelectItem value="products">
                            Our Products / Menu
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image URL</label>
                      <Input
                        name="image"
                        value={newProduct.image}
                        onChange={handleProductChange}
                        placeholder="https://..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Or upload an image file below.
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                      />
                      {isUploadingImage && (
                        <p className="text-xs text-muted-foreground">
                          Uploading image...
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleProductChange}
                        placeholder="Short product description (optional)"
                        rows={3}
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProductForm(false)}
                        className="rounded-xl border-pink-200"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isCreatingProduct}
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      >
                        {isCreatingProduct ? "Adding..." : "Add Product 🍦"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-100 to-blue-50 border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
              <div className="p-2 bg-blue-500 rounded-xl">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalOrders}</div>
              <p className="text-xs text-blue-500 mt-1">All time orders 🍦</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-gradient-to-br from-amber-100 to-orange-50 border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">Pending Orders</CardTitle>
              <div className="p-2 bg-amber-500 rounded-xl">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
              <p className="text-xs text-amber-500 mt-1">Awaiting action ⏳</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-gradient-to-br from-green-100 to-emerald-50 border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Confirmed Orders</CardTitle>
              <div className="p-2 bg-green-500 rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
              <p className="text-xs text-green-500 mt-1">Ready to process ✅</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-gradient-to-br from-pink-100 to-purple-50 border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-pink-700">Total Revenue</CardTitle>
              <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">₹{stats.revenue.toFixed(2)}</div>
              <p className="text-xs text-pink-500 mt-1">Sweet earnings 💰</p>
            </CardContent>
          </Card>
        </div>

        {/* FILTERS */}
        <Card className="mb-6 backdrop-blur-sm bg-white/70 border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
              <Input
                placeholder="Search by order ID, name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-pink-200 focus:border-pink-400 rounded-xl"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger className="w-full md:w-[220px] bg-white/80 border-purple-200 rounded-xl">
                <Filter className="h-4 w-4 mr-2 text-purple-400" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🍦 All Orders</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
                <SelectItem value="confirmed">✅ Confirmed</SelectItem>
                <SelectItem value="processing">🔄 Processing</SelectItem>
                <SelectItem value="shipped">🚚 Shipped</SelectItem>
                <SelectItem value="delivered">🎉 Delivered</SelectItem>
                <SelectItem value="cancelled">❌ Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* ORDERS TABLE */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              All Orders ({filteredOrders.length})
              <Star className="h-4 w-4 text-yellow-300" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12">
                        <IceCream className="h-12 w-12 mx-auto text-pink-300 mb-3" />
                        <p className="text-gray-500 text-lg">
                          No orders found 🍦
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Try adjusting your search or filter
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-mono text-xs">
                          #{order._id.slice(-8)}
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1 min-w-[250px]">
                            <p className="font-medium text-gray-900">
                              {order.shippingAddress.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              📞 {order.shippingAddress.phone}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ✉️ {order.shippingAddress.email}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <p>📍 {order.shippingAddress.address}</p>
                              <p className="pl-4">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                              <p className="pl-4">PIN: {order.shippingAddress.pincode}</p>
                              {order.shippingAddress.landmark && (
                                <p className="pl-4 text-gray-500">Landmark: {order.shippingAddress.landmark}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{order.items.length} items</TableCell>

                        <TableCell className="font-semibold">
                          ₹{order.totalAmount.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          {getStatusBadge(order.orderStatus, order.cancelledBy)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              order.paymentMethod === "cod"
                                ? "outline"
                                : "default"
                            }
                          >
                            {order.paymentMethod.toUpperCase()}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </TableCell>

                        <TableCell>
                          {order.cancelledBy === "user" ? (
                            <div className="text-center">
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                User Cancelled
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">Cannot modify</p>
                            </div>
                          ) : order.orderStatus === "cancelled" ? (
                            <div className="text-center">
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                Admin Cancelled
                              </Badge>
                              <Button
                                variant="link"
                                size="sm"
                                className="text-xs text-blue-500 p-0 h-auto mt-1"
                                onClick={() => updateOrderStatus(order._id, "pending")}
                              >
                                Restore to Pending
                              </Button>
                            </div>
                          ) : (
                            <div className="min-w-[280px]">
                              {/* Visual Progress Tracker */}
                              <div className="flex items-center justify-between gap-1">
                                {[
                                  { key: "pending", label: "Placed", icon: ShoppingBag },
                                  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
                                  { key: "shipped", label: "Shipped", icon: Truck },
                                  { key: "delivered", label: "Delivered", icon: Gift },
                                ].map((step, index, arr) => {
                                  const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
                                  const currentIndex = statusOrder.indexOf(order.orderStatus.toLowerCase());
                                  const stepIndex = statusOrder.indexOf(step.key);
                                  const isCompleted = stepIndex <= currentIndex;
                                  const isCurrent = stepIndex === currentIndex;
                                  const StepIcon = step.icon;
                                  const isLast = index === arr.length - 1;

                                  return (
                                    <div key={step.key} className="flex items-center flex-1">
                                      {/* Step Circle - Clickable */}
                                      <button
                                        onClick={() => updateOrderStatus(order._id, step.key)}
                                        className={`
                                          relative flex flex-col items-center group cursor-pointer transition-all duration-200
                                          ${isCurrent ? 'scale-110' : 'hover:scale-105'}
                                        `}
                                        title={`Set to ${step.label}`}
                                      >
                                        <div className={`
                                          w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                                          ${isCompleted 
                                            ? "bg-green-500 border-green-500 text-white" 
                                            : "bg-white border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-500"}
                                          ${isCurrent ? "ring-2 ring-green-200" : ""}
                                        `}>
                                          <StepIcon className="h-4 w-4" />
                                        </div>
                                        <span className={`
                                          text-[10px] mt-1 font-medium whitespace-nowrap
                                          ${isCompleted ? "text-green-600" : "text-gray-400"}
                                        `}>
                                          {step.label}
                                        </span>
                                      </button>
                                      
                                      {/* Connecting Line */}
                                      {!isLast && (
                                        <div className={`
                                          flex-1 h-0.5 mx-1 transition-all duration-200
                                          ${stepIndex < currentIndex ? "bg-green-500" : "bg-gray-200"}
                                        `} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {/* Cancel Button */}
                              <div className="mt-2 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 h-6 px-2"
                                  onClick={() => updateOrderStatus(order._id, "cancelled")}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Cancel Order
                                </Button>
                              </div>
                            </div>
                          )}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteOrder(order._id)}
                            title="Delete Order"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* MANAGE PRODUCT IMAGES (ADMIN ONLY) */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                <IceCream className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Manage Product Images
              </h2>
            </div>
            {isLoadingProducts && (
              <span className="text-sm text-pink-500 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading products...
              </span>
            )}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
              <IceCream className="h-16 w-16 mx-auto text-pink-300 mb-4" />
              <p className="text-lg text-gray-500">
                No products found. Add a product above to get started! 🍦
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card
                  key={product._id}
                  className="group relative overflow-hidden rounded-3xl border-0 shadow-lg bg-gradient-to-br from-pink-50 via-white to-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/40 cursor-pointer"
                    onClick={() => startEditProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[1px]"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-xs text-white bg-black/50 px-3 py-1 rounded-full">Click to edit</span>
                    </div>
                  </div>

                  <CardContent className="py-3 px-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description || "Premium handcrafted ice cream"}
                        </p>
                      </div>
                      <Badge className="bg-pink-100 text-pink-700 border-0">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                      <Button size="sm" className="rounded-full bg-pink-500 hover:bg-pink-600 text-white">
                        Add to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pink-50 via-white to-purple-50 border-0 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-pink-600">
              <IceCream className="h-5 w-5" />
              Edit Product
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Update the image, category, description, and price. Changes apply instantly. ✨
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
                    <Upload className="h-4 w-4 text-blue-600" />
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
                  className="rounded-xl border-pink-200"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveEdit} 
                  disabled={isSavingEdit}
                  className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {isSavingEdit ? "Saving..." : "Save ✨"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

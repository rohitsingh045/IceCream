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
  const getStatusBadge = (status: string) => {
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
        label: "Cancelled",
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
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="mt-3 text-muted-foreground">
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
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage all customer orders – accept, reject, and track status.
          </p>
        </div>

        {/* ADD PRODUCT (ADMIN ONLY) - LEFT SECTION */}
        <div className="mb-8">
          {!showProductForm ? (
            <Button onClick={() => setShowProductForm(true)}>
              Add Product
            </Button>
          ) : (
            <div className="max-w-xl">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
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
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreatingProduct}>
                        {isCreatingProduct ? "Adding..." : "Add Product"}
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Orders</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.revenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* FILTERS */}
        <Card className="mb-6">
          <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger className="w-full md:w-[220px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* ORDERS TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
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
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No orders found.
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
                          <div>
                            <p className="font-medium">
                              {order.shippingAddress.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.shippingAddress.phone}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>{order.items.length} items</TableCell>

                        <TableCell className="font-semibold">
                          ₹{order.totalAmount.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          {getStatusBadge(order.orderStatus)}
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
                          <Select
                            value={order.orderStatus}
                            onValueChange={(val) =>
                              updateOrderStatus(order._id, val)
                            }
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">
                                Confirmed (Accept)
                              </SelectItem>
                              <SelectItem value="processing">
                                Processing
                              </SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled (Reject)
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Manage Product Images</h2>
            {isLoadingProducts && (
              <span className="text-sm text-muted-foreground">
                Loading products...
              </span>
            )}
          </div>

          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products found. Add a product above to get started.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card
                  key={product._id}
                  className="group relative overflow-hidden rounded-3xl border-0 shadow-sm bg-gradient-to-br from-pink-50 via-white to-blue-50"
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the image, category, description, and price. Changes apply instantly.
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

export default AdminDashboard;

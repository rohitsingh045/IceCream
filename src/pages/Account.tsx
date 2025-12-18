import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Package,
  Loader2,
  ShoppingBag,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Mail,
  Phone,
  IceCream,
  Sparkles,
  Heart,
  Star,
  Gift,
} from "lucide-react";
import { API_URL } from "@/lib/api";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrders(data.orders || []);
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view your account");
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate, fetchOrders]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancellingOrderId(orderId);
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Order cancelled successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "cancelled" }
              : order
          )
        );
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to cancel order");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Order progress steps
  const orderSteps = [
    { key: "pending", label: "Order Placed", icon: ShoppingBag },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Gift },
  ];

  const getStepStatus = (orderStatus: string, stepKey: string) => {
    const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(orderStatus.toLowerCase());
    const stepIndex = statusOrder.indexOf(stepKey);
    
    if (orderStatus.toLowerCase() === "cancelled") {
      return stepKey === "pending" ? "cancelled" : "upcoming";
    }
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const getEstimatedDate = (createdAt: string, step: string) => {
    const date = new Date(createdAt);
    switch (step) {
      case "pending":
        return formatDate(createdAt);
      case "confirmed":
        date.setHours(date.getHours() + 2);
        return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      case "shipped":
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      case "delivered":
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <IceCream className="h-16 w-16 text-pink-500 mx-auto mb-4 animate-bounce" />
            <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <p className="text-pink-600 font-medium">Loading your sweet journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 relative overflow-hidden">
      {/* Full Screen Ice Cream Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large decorative ice cream images */}
        <img 
          src="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&q=80" 
          alt="" 
          className="absolute -top-10 -left-10 w-48 h-48 object-cover rounded-full opacity-20 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&q=80" 
          alt="" 
          className="absolute top-20 -right-10 w-56 h-56 object-cover rounded-full opacity-15 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=300&q=80" 
          alt="" 
          className="absolute top-1/3 -left-16 w-44 h-44 object-cover rounded-full opacity-20 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1560008581-09826d1de69e?w=300&q=80" 
          alt="" 
          className="absolute top-1/2 -right-12 w-52 h-52 object-cover rounded-full opacity-15 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&q=80" 
          alt="" 
          className="absolute bottom-1/3 -left-8 w-40 h-40 object-cover rounded-full opacity-20 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=80" 
          alt="" 
          className="absolute bottom-20 -right-16 w-48 h-48 object-cover rounded-full opacity-15 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1488900128323-21503983a07e?w=300&q=80" 
          alt="" 
          className="absolute -bottom-10 left-1/4 w-44 h-44 object-cover rounded-full opacity-20 blur-sm"
        />
        <img 
          src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&q=80" 
          alt="" 
          className="absolute bottom-1/4 right-1/4 w-36 h-36 object-cover rounded-full opacity-10 blur-sm"
        />
        
        {/* Colorful blur circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
        
        {/* Floating Ice Cream Emojis - scattered across screen */}
        <div className="absolute top-[5%] left-[2%] text-7xl opacity-30">🍦</div>
        <div className="absolute top-[8%] right-[3%] text-8xl opacity-25">🍨</div>
        <div className="absolute top-[20%] left-[85%] text-6xl opacity-30">🍧</div>
        <div className="absolute top-[35%] left-[1%] text-7xl opacity-25">🍨</div>
        <div className="absolute top-[45%] right-[2%] text-8xl opacity-30">🍦</div>
        <div className="absolute top-[60%] left-[3%] text-6xl opacity-25">🧁</div>
        <div className="absolute top-[75%] right-[1%] text-7xl opacity-30">🍧</div>
        <div className="absolute top-[85%] left-[2%] text-8xl opacity-25">🍦</div>
        <div className="absolute bottom-[5%] right-[4%] text-6xl opacity-30">🍨</div>
        <div className="absolute top-[15%] left-[90%] text-5xl opacity-20">🍦</div>
        <div className="absolute top-[55%] left-[92%] text-6xl opacity-25">🍧</div>
        <div className="absolute bottom-[25%] left-[1%] text-7xl opacity-20">🍨</div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Header Card */}
          <Card className="mb-8 overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-md">
            {/* Gradient Header with Pattern */}
            <div className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 p-8 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full" />
              
              {/* Profile Content */}
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-white shadow-2xl">
                    <AvatarFallback className="bg-gradient-to-br from-pink-200 to-purple-200 text-pink-600 text-3xl font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-lg">
                    <IceCream className="h-5 w-5 text-pink-500" />
                  </div>
                </div>
                <div className="text-center sm:text-left text-white">
                  <h1 className="text-3xl font-bold drop-shadow-lg">{user?.name}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 opacity-90">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      Ice Cream Lover
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Order History Section */}
          <div className="mb-6 flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                My Orders
              </h2>
              <p className="text-gray-500 text-sm">
                Track your delicious ice cream orders 🍦
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <Card className="text-center py-16 border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50" />
              <CardContent className="relative">
                <div className="relative inline-block mb-6">
                  <IceCream className="h-24 w-24 text-pink-300 mx-auto" />
                  <Sparkles className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  No orders yet!
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Your ice cream adventure awaits! Explore our delicious flavors and treat yourself to something sweet 🍨
                </p>
                <Button
                  onClick={() => navigate("/menu")}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <IceCream className="h-5 w-5 mr-2" />
                  Explore Ice Creams
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {orders.map((order, orderIndex) => (
                  <AccordionItem
                    key={order._id}
                    value={order._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full text-left">
                        <div className="flex items-center gap-4">
                          {/* Order Icon with gradient */}
                          <div className={`p-3 rounded-xl shadow-md ${
                            orderIndex % 3 === 0 
                              ? 'bg-gradient-to-br from-pink-400 to-pink-500' 
                              : orderIndex % 3 === 1 
                                ? 'bg-gradient-to-br from-purple-400 to-purple-500'
                                : 'bg-gradient-to-br from-cyan-400 to-cyan-500'
                          }`}>
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:ml-auto">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(order.orderStatus)} flex items-center gap-1.5 px-3 py-1 rounded-full font-medium`}
                          >
                            {getStatusIcon(order.orderStatus)}
                            {order.orderStatus}
                          </Badge>
                          <span className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            ₹{order.totalAmount.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <Separator className="mb-5 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200" />

                      {/* Order Progress Tracker */}
                      {order.orderStatus.toLowerCase() !== "cancelled" ? (
                        <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                          <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-100">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            {order.orderStatus.toLowerCase() === "delivered" 
                              ? "Order Delivered!" 
                              : order.orderStatus.toLowerCase() === "shipped"
                              ? "Order Shipped"
                              : order.orderStatus.toLowerCase() === "confirmed"
                              ? "Order Confirmed"
                              : "Order Placed"}
                          </h4>
                          <p className="text-sm text-gray-500 mb-5 ml-9">
                            {order.orderStatus.toLowerCase() === "delivered"
                              ? "Your order has been delivered. Enjoy your ice cream! 🍦"
                              : order.orderStatus.toLowerCase() === "shipped"
                              ? "Your order is on its way to you!"
                              : order.orderStatus.toLowerCase() === "confirmed"
                              ? "Your order has been confirmed and is being prepared."
                              : "Your order has been placed successfully."}
                          </p>
                          
                          {/* Progress Steps */}
                          <div className="relative">
                            <div className="flex justify-between items-start">
                              {orderSteps.map((step, index) => {
                                const status = getStepStatus(order.orderStatus, step.key);
                                const StepIcon = step.icon;
                                const isLast = index === orderSteps.length - 1;
                                
                                return (
                                  <div key={step.key} className="flex flex-col items-center relative z-10 flex-1">
                                    {/* Step Circle */}
                                    <div className={`
                                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                      ${status === "completed" 
                                        ? "bg-green-500 border-green-500 text-white" 
                                        : status === "current"
                                        ? "bg-green-500 border-green-500 text-white ring-4 ring-green-100"
                                        : "bg-white border-gray-300 text-gray-400"}
                                    `}>
                                      {status === "completed" ? (
                                        <CheckCircle className="h-5 w-5" />
                                      ) : (
                                        <StepIcon className="h-5 w-5" />
                                      )}
                                    </div>
                                    
                                    {/* Step Label */}
                                    <p className={`
                                      text-xs font-semibold mt-2 text-center
                                      ${status === "completed" || status === "current" ? "text-green-600" : "text-gray-400"}
                                    `}>
                                      {step.label}
                                    </p>
                                    
                                    {/* Connecting Line */}
                                    {!isLast && (
                                      <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5">
                                        <div className={`
                                          h-full transition-all duration-500
                                          ${status === "completed" ? "bg-green-500" : "bg-gray-200"}
                                        `} />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Delivery info message */}
                          {order.orderStatus.toLowerCase() !== "delivered" && (
                            <div className="mt-5 pt-4 border-t border-green-100">
                              <p className="text-xs text-gray-500 flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                Delivery executive details will be available once the order is out for delivery
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Cancelled Order Message */
                        <div className="mb-6 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-red-100">
                              <XCircle className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-bold text-red-700">Order Cancelled</h4>
                              <p className="text-sm text-red-600">This order has been cancelled.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order Items */}
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-pink-100">
                            <IceCream className="h-4 w-4 text-pink-500" />
                          </div>
                          Items Ordered
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl p-4 border border-pink-100/50"
                            >
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 rounded-xl object-cover shadow-md"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-md">
                                  <IceCream className="h-8 w-8 text-pink-500" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} × ₹{item.price}
                                </p>
                              </div>
                              <p className="font-bold text-pink-600 text-lg">
                                ₹{(item.quantity * item.price).toFixed(0)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Shipping Address */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100/50">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-100">
                              <MapPin className="h-4 w-4 text-blue-500" />
                            </div>
                            Shipping Address
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1.5">
                            <p className="font-semibold text-gray-800">
                              {order.shippingAddress.fullName}
                            </p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                              {order.shippingAddress.pincode}
                            </p>
                            <p className="flex items-center gap-1.5 pt-1 text-blue-600">
                              <Phone className="h-3.5 w-3.5" />
                              {order.shippingAddress.phone}
                            </p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100/50">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-100">
                              <CreditCard className="h-4 w-4 text-green-500" />
                            </div>
                            Payment Details
                          </h4>
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Method</span>
                              <span className="font-semibold capitalize text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-xs">
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Status</span>
                              <Badge
                                variant="secondary"
                                className={`${getPaymentStatusColor(order.paymentStatus)} rounded-full`}
                              >
                                {order.paymentStatus}
                              </Badge>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center pt-1">
                              <span className="font-semibold text-gray-800">Total</span>
                              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                ₹{order.totalAmount.toFixed(0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cancel Button - Only show for pending orders */}
                      {order.orderStatus.toLowerCase() === "pending" && (
                        <div className="mt-6 pt-5 border-t border-gray-200">
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full px-6"
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={cancellingOrderId === order._id}
                          >
                            {cancellingOrderId === order._id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            You can cancel before admin confirms
                          </p>
                        </div>
                      )}

                      {/* Show message for confirmed orders */}
                      {order.orderStatus.toLowerCase() !== "pending" && 
                       order.orderStatus.toLowerCase() !== "cancelled" && (
                        <div className="mt-6 pt-5 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Order confirmed! Cannot be cancelled.</span>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Bottom CTA */}
          {orders.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => navigate("/menu")}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <IceCream className="h-5 w-5 mr-2" />
                Order More Ice Cream
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

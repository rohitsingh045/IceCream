import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  IndianRupee,
  User,
  Mail,
  Phone,
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
      console.error("Fetch orders error:", error);
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
        // Update the order in local state
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
      console.error("Cancel order error:", error);
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
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-4 ring-white/50 shadow-xl">
                <AvatarFallback className="bg-white text-primary text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <div className="flex items-center gap-2 mt-1 opacity-90">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Order History Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            My Orders
          </h2>
          <p className="text-muted-foreground mt-1">
            View and track all your previous orders
          </p>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start exploring our delicious ice creams!
              </p>
              <Button
                onClick={() => navigate("/menu")}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Package className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {orders.map((order) => (
                <AccordionItem
                  key={order._id}
                  value={order._id}
                  className="bg-white rounded-xl shadow-md border-0 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full text-left">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:ml-auto">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(order.orderStatus)} flex items-center gap-1`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus}
                        </Badge>
                        <span className="font-bold text-primary">
                          ₹{order.totalAmount.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Separator className="mb-4" />

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        Items Ordered
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-primary" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                            <p className="font-semibold text-primary">
                              ₹{(item.quantity * item.price).toFixed(0)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="font-medium text-gray-900">
                            {order.shippingAddress.fullName}
                          </p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                            {order.shippingAddress.pincode}
                          </p>
                          <p className="flex items-center gap-1 pt-1">
                            <Phone className="h-3 w-3" />
                            {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Payment Details
                        </h4>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Method</span>
                            <span className="font-medium capitalize">
                              {order.paymentMethod}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <Badge
                              variant="secondary"
                              className={getPaymentStatusColor(order.paymentStatus)}
                            >
                              {order.paymentStatus}
                            </Badge>
                          </div>
                          <Separator />
                          <div className="flex justify-between pt-1">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="font-bold text-primary text-lg">
                              ₹{order.totalAmount.toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancel Button - Only show for pending orders */}
                    {order.orderStatus.toLowerCase() === "pending" && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
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
                        <p className="text-xs text-muted-foreground mt-2">
                          You can cancel this order before it's confirmed by admin
                        </p>
                      </div>
                    )}

                    {/* Show message for confirmed orders */}
                    {order.orderStatus.toLowerCase() !== "pending" && 
                     order.orderStatus.toLowerCase() !== "cancelled" && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          This order has been confirmed and cannot be cancelled
                        </p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

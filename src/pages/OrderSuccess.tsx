import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  MapPin,
  Phone,
  Calendar,
  Package,
  ArrowRight,
  IceCream,
  Sparkles,
  Home,
  ShoppingBag,
} from "lucide-react";
import { API_URL } from "@/lib/api";

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
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (orderId) {
      fetchOrder();
    }
  }, [isAuthenticated, orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      // Fail silently
    }
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Estimated delivery in 3 days
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
        
        {/* Floating emojis */}
        <div className="absolute top-[10%] left-[5%] text-6xl opacity-20 animate-bounce">🍦</div>
        <div className="absolute top-[15%] right-[8%] text-7xl opacity-15 animate-pulse">🎉</div>
        <div className="absolute bottom-[20%] left-[8%] text-5xl opacity-20 animate-bounce">🍨</div>
        <div className="absolute bottom-[15%] right-[5%] text-6xl opacity-15 animate-pulse">✨</div>
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-lg">
          {/* Success Header */}
          <div className="text-center mb-8">
            {/* Animated Success Icon */}
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 animate-pulse">
                <CheckCircle className="h-14 w-14 text-white" strokeWidth={2.5} />
              </div>
              {/* Sparkles around the icon */}
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              <Sparkles className="absolute -bottom-1 -left-3 h-6 w-6 text-green-400 animate-ping" />
              <div className="absolute top-0 left-0 w-full h-full">
                <span className="absolute -top-4 left-1/2 text-2xl animate-bounce">✨</span>
                <span className="absolute top-1/2 -right-6 text-xl animate-pulse">🎊</span>
                <span className="absolute -bottom-4 left-1/4 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Thanks for ordering! 🍦
            </h1>
            <p className="text-gray-600">
              Your ice cream is on its way to you!
            </p>
          </div>

          {/* Delivery Info Card */}
          <Card className="mb-6 border-0 shadow-xl bg-white/90 backdrop-blur-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Estimated Delivery</p>
                  <p className="text-white font-bold text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {getDeliveryDate()}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              {order && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-bold text-gray-800">#{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-xl text-green-600">₹{order.totalAmount.toFixed(0)}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </>
              )}

              <Button
                variant="outline"
                className="w-full border-green-300 text-green-600 hover:bg-green-50 rounded-xl py-6"
                onClick={() => navigate("/account")}
              >
                <Package className="h-5 w-5 mr-2" />
                Track & Manage Order
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Address Card */}
          {order && (
            <Card className="mb-6 border-0 shadow-lg bg-white/90 backdrop-blur-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  Delivery Address
                </h3>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="font-semibold text-gray-800">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {order.shippingAddress.pincode}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 text-sm pt-2">
                    <Phone className="h-4 w-4" />
                    {order.shippingAddress.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              onClick={() => navigate("/menu")}
            >
              <IceCream className="h-5 w-5 mr-2" />
              Order More Ice Cream
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-6 rounded-xl"
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Fun message */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
              <span className="text-2xl">🍨</span>
              <p className="text-gray-600 text-sm">
                Get ready for some <span className="font-bold text-pink-500">delicious</span> ice cream!
              </p>
              <span className="text-2xl">🍦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background w-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="bg-muted rounded-full p-8 mb-6">
                <ShoppingCart className="h-24 w-24 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-muted-foreground text-center mb-8 max-w-md">
                Looks like you haven't added any delicious ice cream to your cart
                yet. Start shopping now!
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/menu")}
                  size="lg"
                  className="gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Browse Menu
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  size="lg"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/menu")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-destructive hover:text-destructive"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-accent/20 to-primary/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">
                            {item.name}
                          </h3>
                          {item.category && (
                            <Badge variant="outline" className="mb-2">
                              {item.category}
                            </Badge>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Price: ₹{item.price} per unit
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive flex-shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Quantity Controls and Price */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-r-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-16 text-center text-base font-semibold border-x">
                              {item.quantity}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-l-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Subtotal
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      On all orders
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">
                      100% Protected
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fresh Products</p>
                    <p className="text-xs text-muted-foreground">
                      Quality Assured
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items Breakdown */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground truncate">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (included)</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                {/* Savings Badge */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    🎉 You're saving ₹50 on delivery!
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => navigate("/checkout")}
                    className="w-full"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    onClick={() => navigate("/menu")}
                    variant="outline"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    We accept
                  </p>
                  <div className="flex justify-center gap-3">
                    <Badge variant="outline">Cash on Delivery</Badge>
                    <Badge variant="outline">UPI</Badge>
                    <Badge variant="outline">Cards</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping Banner */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">
                Want to add more items?
              </h3>
              <p className="text-muted-foreground">
                Explore our full menu of delicious ice cream flavors
              </p>
            </div>
            <Button
              onClick={() => navigate("/menu")}
              size="lg"
              className="gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
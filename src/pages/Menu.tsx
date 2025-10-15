import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IceCream } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Menu = () => {
  const categories = ["All", "Cones", "Cups", "Sundaes", "Family Packs"];
  const [activeCategory, setActiveCategory] = useState("All");

  const menuItems = [
    {
      name: "Kesar Pista Cone",
      category: "Cones",
      price: "₹120",
      description: "Royal saffron with crunchy pistachios in a crispy cone"
    },
    {
      name: "Mango Kulfi Cup",
      category: "Cups",
      price: "₹100",
      description: "Authentic Indian mango delight served in a cup"
    },
    {
      name: "Rose Falooda Sundae",
      category: "Sundaes",
      price: "₹180",
      description: "Fragrant rose with vermicelli, nuts, and toppings"
    },
    {
      name: "Chocolate Chip Cone",
      category: "Cones",
      price: "₹90",
      description: "Classic chocolate with real chocolate chips"
    },
    {
      name: "Strawberry Cup",
      category: "Cups",
      price: "₹80",
      description: "Fresh strawberry ice cream in a convenient cup"
    },
    {
      name: "Family Pack Variety",
      category: "Family Packs",
      price: "₹500",
      description: "1L tub with 4 different flavors of your choice"
    },
    {
      name: "Vanilla Cone",
      category: "Cones",
      price: "₹70",
      description: "Classic vanilla in a crispy wafer cone"
    },
    {
      name: "Butterscotch Sundae",
      category: "Sundaes",
      price: "₹160",
      description: "Creamy butterscotch with caramel sauce and nuts"
    },
  ];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our delightful collection of handcrafted ice creams
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ 
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-soft)"
              }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="aspect-square bg-accent/20 rounded-2xl flex items-center justify-center">
                  <IceCream className="w-16 h-16 text-primary animate-float" />
                </div>
                
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-2xl font-bold text-primary">{item.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;

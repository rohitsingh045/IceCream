import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, IceCream, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const featuredFlavors = [
    {
      name: "Kesar Pista",
      description: "Royal saffron with crunchy pistachios",
      price: "₹120",
      image: "/placeholder.svg"
    },
    {
      name: "Mango Kulfi",
      description: "Authentic Indian mango delight",
      price: "₹100",
      image: "/placeholder.svg"
    },
    {
      name: "Rose Falooda",
      description: "Fragrant rose with vermicelli",
      price: "₹140",
      image: "/placeholder.svg"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Authentic Indian Ice Cream Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              नमस्ते भारत
            </h1>
            
            <p className="text-xl md:text-2xl text-primary font-medium">
              A smile in every scoop 🍨✨
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the rich flavors of India with our handcrafted ice creams, 
              made with love and authentic ingredients.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/menu">
                  Explore Menu
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flavors */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-primary">
            <Star className="w-5 h-5 fill-primary" />
            <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">Our Special Flavors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked favorites that bring the taste of India to your palate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFlavors.map((flavor, index) => (
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
                  <IceCream className="w-20 h-20 text-primary animate-float" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{flavor.name}</h3>
                  <p className="text-muted-foreground">{flavor.description}</p>
                  <p className="text-2xl font-bold text-primary">{flavor.price}</p>
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

      <Footer />
    </div>
  );
};

export default Home;

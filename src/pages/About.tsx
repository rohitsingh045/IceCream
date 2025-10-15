import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every scoop is crafted with passion and authentic Indian ingredients"
    },
    {
      icon: Sparkles,
      title: "Quality First",
      description: "We use only the finest ingredients to ensure the best taste"
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Recipes passed down through generations of ice cream makers"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in taste and quality"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing the authentic taste of India to every scoop
          </p>
        </div>

        {/* Story Section */}
        <Card 
          className="mb-16 overflow-hidden"
          style={{ 
            background: "var(--gradient-card)",
            boxShadow: "var(--shadow-soft)"
          }}
        >
          <CardContent className="p-12">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Namaste Bharat began with a simple dream: to share the authentic flavors 
                  of Indian ice cream with the world. Our journey started in a small kitchen, 
                  where traditional recipes met modern craftsmanship.
                </p>
                <p>
                  Today, we're proud to serve handcrafted ice creams that honor our heritage 
                  while delighting taste buds with every scoop. From classic Kesar Pista to 
                  innovative fusion flavors, each creation tells a story of India's rich 
                  culinary tradition.
                </p>
                <p>
                  We believe that ice cream is more than just a dessert—it's a moment of joy, 
                  a celebration, and a sweet memory waiting to be made.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card 
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ 
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-soft)"
              }}
            >
              <CardContent className="p-6 space-y-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

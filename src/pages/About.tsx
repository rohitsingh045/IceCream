import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Users, Award, IceCream, MapPin, Truck, Calendar, CheckCircle, PartyPopper, Gift, Phone, Mail, Clock, Star, Zap, Tag, Target, Megaphone } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const offerings = [
    {
      icon: IceCream,
      title: "Wide Variety of Flavors",
      description: "Vanilla, Chocolate, Mango, Strawberry, Butterscotch aur bahut saare desi swad jaise Kulfi, Rajbhog aur Kesar Pista"
    },
    {
      icon: Sparkles,
      title: "Freshly Prepared",
      description: "Sab ice creams freshly prepared hoti hain hamare trained team ke dwara, hygiene aur quality ka full dhyaan rakhte hue"
    },
  ];

  const celebrations = [
    {
      icon: PartyPopper,
      title: "Weddings (Shaadi)",
      description: "Special wedding packages with premium flavors. हम आपकी शादी को और भी sweet बनाते हैं!",
      popular: true
    },
    {
      icon: Calendar,
      title: "Birthday Parties",
      description: "Customized birthday ice cream cakes and party packs. बच्चों से लेकर बड़ों तक, सबके लिए!",
      popular: true
    },
    {
      icon: Gift,
      title: "Corporate Events",
      description: "Bulk orders for office parties, conferences, और corporate celebrations",
      popular: false
    },
    {
      icon: Heart,
      title: "Festivals & Functions",
      description: "Diwali, Holi, Eid, Christmas - har tyohar ko banaye special with our flavors",
      popular: false
    },
  ];

  const currentOffers = [
    {
      title: "Family Pack Bonanza",
      discount: "20% OFF",
      description: "1kg family pack par 20% discount! Perfect for weekend celebrations",
      code: "FAMILY20",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Bulk Order Special",
      discount: "30% OFF",
      description: "50+ ice creams order karne par 30% chhoot + free delivery",
      code: "BULK30",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Festival Dhamaka",
      discount: "25% OFF",
      description: "Kisi bhi festival par 25% discount on all traditional flavors",
      code: "FESTIVAL25",
      color: "from-orange-500 to-red-500"
    },
  ];

  const locations = [
    {
      area: "Gopalganj Main Market",
      address: "Shop No. 15, Main Road, Gopalganj, Bihar",
      phone: "+91 123 456 7890",
      timing: "10:00 AM - 10:00 PM"
    },
    {
      area: "Delivery Coverage",
      address: "Gopalganj City, Nearby Villages (10km radius), Towns & Suburbs",
      phone: "+91 123 456 7890",
      timing: "Delivery: 11:00 AM - 9:00 PM"
    },
  ];

  const whyChooseUs = [
    "100% Fresh & Natural Ingredients",
    "Wide Variety of Flavors",
    "Timely Delivery in City & Village",
    "Perfect for Parties, Weddings & Events",
    "Friendly Service with a Desi Touch",
  ];

  const testimonials = [
    {
      name: "Gulshan Kumar",
      location: "Jamsari, Gopalganj",
      rating: 5,
      comment: "Best ice cream in town! शादी में order किया था, सब guests बहुत खुश थे। Quality top-notch hai!"
    },
    {
      name: "Rohit Singh",
      location: "Purani Chock, Gopalganj",
      rating: 5,
      comment: "Delivery time par aayi aur taste amazing tha. Kulfi flavors are absolutely authentic! 🍦"
    },
    {
      name: "Shivam Pandit",
      location: "Radhiya, Motihari",
      rating: 5,
      comment: "Birthday party ke liye 100+ ice creams order kiye. Timely delivery aur great discount mila. Highly recommended!"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
    
      <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-16 mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="relative text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl">
                <IceCream className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Namaste Bharat
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              स्वाद है Bharat का! 🇮🇳
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              "स्वाद है Bharat का, with Namaste Bharat!"
            </p>
          </div>
        </div>

        {/* Story Section */}
        <Card 
          className="mb-12 overflow-hidden border-2 border-primary/10"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}
        >
          <CardContent className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                  Our Journey
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
              <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p className="text-center">
                  <strong className="text-foreground">"Namaste Bharat"</strong> ek desi swad aur modern freshness ka perfect combination hai. 
                  Hum <strong className="text-primary">Gopalganj</strong> se apni journey shuru karke aaj apni ice cream ka magic city se lekar 
                  nearby villages aur towns tak pahunchate hain.
                </p>
                <p className="text-center text-lg font-medium text-foreground bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                  Har scoop me milta hai pure ingredients, creamy texture, aur ek asli Bharat ka taste. 🍦
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <IceCream className="w-8 h-8 text-primary" />
              What We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {offerings.map((item, index) => (
              <Card 
                key={index}
                className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Celebrations We Cater */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <PartyPopper className="w-8 h-8 text-primary" />
              Celebrations We Cater
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">हर celebration को बनाएं memorable with Namaste Bharat! 🎊</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {celebrations.map((item, index) => (
              <Card 
                key={index}
                className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 relative"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
                }}
              >
                {item.popular && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 shadow-lg">
                    <Star className="w-3 h-3 inline mr-1" />
                    Popular
                  </Badge>
                )}
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Bulk Orders Special Benefits */}
          <Card className="mt-10 overflow-hidden border-2 border-primary/20 shadow-xl">
            <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-white text-center">
              <Gift className="w-12 h-12 mx-auto mb-3" />
              {/* <h3 className="text-2xl md:text-3xl font-bold mb-2">Bulk Orders Special Benefits</h3>
              <p className="text-white/90">50+ ice creams order करने पर मिलेंगे ये amazing benefits! 🎁</p> */}
            </div>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-2">Free Delivery</h4>
                  <p className="text-sm text-muted-foreground">Bulk orders par पूरी तरह free home delivery</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-2">Custom Packaging</h4>
                  <p className="text-sm text-muted-foreground">आपके event के according special packaging</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-2">Flexible Timing</h4>
                  <p className="text-sm text-muted-foreground">आपकी convenience के according delivery time</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Tag className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-2">Special Discounts</h4>
                  <p className="text-sm text-muted-foreground">Bulk quantity par extra discount available</p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-foreground">Minimum Order: Ice Creams</h4>
                      <p className="text-sm text-muted-foreground">Perfect for weddings, parties, and corporate events</p>
                    </div>
                  </div>
                  <a 
                    href="/contact"
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
                  >
                    Book Bulk Order
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                  {/* <p className="text-2xl font-bold text-primary mb-1">30%</p>
                  <p className="text-xs text-muted-foreground">Discount on 100+ items</p> */}
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary mb-1">24 Hours</p>
                  <p className="text-xs text-muted-foreground">Advance booking required</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary mb-1">10km</p>
                  <p className="text-xs text-muted-foreground">Free delivery radius</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location & Contact Details */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <MapPin className="w-8 h-8 text-primary" />
              Find Us & Visit
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">आइये हमारे store पर या order करें home delivery के लिए! 🛵</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {locations.map((location, index) => (
              <Card 
                key={index}
                className="overflow-hidden border-2 border-primary/10 hover:shadow-xl transition-all"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{location.area}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <Phone className="w-5 h-5 text-primary flex-shrink-0" /> */}
                      {/* <a href={`tel:${location.phone}`} className="text-primary font-semibold hover:underline">
                        {location.phone}
                      </a> */}
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground font-medium">{location.timing}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
              <Target className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">10km+</h3>
              <p className="text-sm text-muted-foreground">Delivery Radius</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
              <Users className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">5000+</h3>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
              <IceCream className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">25+</h3>
              <p className="text-sm text-muted-foreground">Flavors</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
              <Truck className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">Same Day</h3>
              <p className="text-sm text-muted-foreground">Delivery</p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-yellow-500" />
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">हमारे customers के दिल की बातें ❤️</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="overflow-hidden border-2 border-primary/10 hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.comment}"</p>
                  <div className="pt-3 border-t border-primary/10">
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advertisement Banner */}
        <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 md:p-12 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center space-y-6">
            <Megaphone className="w-16 h-16 mx-auto animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Winter Special Is Here! ❄️
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              इस सर्दी में गर्माहट भरी मिठास! New Hot Chocolate Fudge Sundae और Butterscotch Delight available now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge className="bg-white text-purple-600 text-lg px-6 py-2 font-bold">
                Limited Time Only
              </Badge>
              <Badge className="bg-yellow-400 text-purple-900 text-lg px-6 py-2 font-bold">
                Order Now & Save 15%
              </Badge>
            </div>
            <a 
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-2xl hover:shadow-xl transition-all hover:scale-105 mt-4"
            >
              <IceCream className="w-5 h-5 mr-2" />
              Explore Winter Collection
            </a>
          </div>
        </div>

        {/* Why Choose Us */}
        <Card 
          className="mb-12 overflow-hidden border-2 border-primary/10"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
          }}
        >
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                Why Choose Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
              <p className="text-muted-foreground text-lg">जो हमें special बनाता है</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyChooseUs.map((reason, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-5 bg-gradient-to-br from-white to-primary/5 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-primary/10"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-foreground font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Taste the Magic? 🍨
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Aao aur experience karo ek asli Bharat ka swad with Namaste Bharat Ice Cream!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <IceCream className="w-5 h-5 mr-2" />
              View Our Menu
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-primary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

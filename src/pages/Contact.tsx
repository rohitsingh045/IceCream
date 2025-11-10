import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Twitter, Send, MapPinIcon, PhoneCall, IceCream } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon. Thank you for reaching out!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <MessageSquare className="w-16 h-16 text-primary relative z-10" />
            </div>
          </div>
          
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none px-4 py-1 text-sm">
            हम यहाँ हैं आपके लिए! 💬
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-foreground">हमसे जुड़ें!</span> Questions, feedback, or bulk orders? 
            <br className="hidden md:block" />
            We're here to serve you with a smile! 🍦
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-full">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-foreground">कॉल करें</h3>
              <p className="text-sm text-muted-foreground">Quick response</p>
              <p className="text-lg font-semibold text-pink-600 dark:text-pink-400">+91 98765 43210</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-foreground">ईमेल करें</h3>
              <p className="text-sm text-muted-foreground">24h reply time</p>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">hello@namastebharat.com</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-full">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-foreground">विजिट करें</h3>
              <p className="text-sm text-muted-foreground">Visit our store</p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Gopalganj Main Market</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card 
            className="overflow-hidden border-2 hover:shadow-xl transition-shadow"
            style={{ 
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
              borderImage: "linear-gradient(135deg, #ec4899, #a855f7) 1"
            }}
          >
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Send Message</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">हमें अपना संदेश भेजें - Fill the form below</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="name" 
                      placeholder="आपका नाम / Your name" 
                      required 
                      className="rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      required
                      className="rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="विषय / Subject of your message" 
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="अपना संदेश लिखें / Write your message here..." 
                    rows={5}
                    required 
                    className="rounded-xl border-2 focus:border-primary resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold" 
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-2 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">हमसे संपर्क करें</h2>
                <p className="text-pink-50">Contact Information</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">हमारी दुकान</h3>
                    <p className="text-sm text-muted-foreground mb-1">Visit Our Store</p>
                    <p className="text-foreground font-medium">
                      Gopalganj Main Market<br />
                      Near Bus Stand, Gopalganj<br />
                      Bihar - 841428
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>

                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">फ़ोन नंबर</h3>
                    <p className="text-sm text-muted-foreground mb-1">Call Us Anytime</p>
                    <p className="text-foreground font-medium">
                      +91 98765 43210<br />
                      +91 87654 32109
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Sun: 9 AM - 10 PM</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>

                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">ईमेल पता</h3>
                    <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                    <p className="text-foreground font-medium">
                      hello@namastebharat.com<br />
                      support@namastebharat.com
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">24-hour response time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="text-xl font-bold text-foreground">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <span className="font-medium text-foreground">सोमवार - शुक्रवार</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">9 AM - 10 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <span className="font-medium text-foreground">शनिवार - रविवार</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">9 AM - 11 PM</span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    💝 Open on all festivals & holidays!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">Follow Us</h3>
                <p className="text-sm text-muted-foreground mb-4">सोशल मीडिया पर जुड़ें</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full hover:scale-110 transition-transform">
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="overflow-hidden border-2">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-6 h-6" />
                <h2 className="text-2xl font-bold">हमारी लोकेशन / Our Location</h2>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MapPinIcon className="w-16 h-16 text-primary mx-auto" />
                  <p className="text-lg font-semibold text-foreground">Namaste Bharat Ice Cream</p>
                  <p className="text-muted-foreground">Gopalganj Main Market, Bihar</p>
                  <Button className="mt-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Quick Information</h2>
            <p className="text-muted-foreground">आपके सवालों के जवाब</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-2 border-pink-200 dark:border-pink-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <IceCream className="w-6 h-6 text-pink-600 dark:text-pink-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Bulk Orders</h3>
                    <p className="text-sm text-muted-foreground">
                      बल्क ऑर्डर के लिए कम से कम 24 घंटे पहले संपर्क करें। Special discounts available on large orders!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Home Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      10 किलोमीटर की दूरी तक फ्री होम डिलीवरी। Same day delivery available within Gopalganj!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Custom Flavors</h3>
                    <p className="text-sm text-muted-foreground">
                      कस्टम फ्लेवर बनवाने के लिए हमें कॉल करें। We can create special flavors for events!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      हम 24 घंटे के अंदर जवाब देते हैं। Email responses within 24 hours, call for immediate help!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="overflow-hidden border-0">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Taste the Magic? 🍦
              </h2>
              <p className="text-lg mb-6 text-pink-50">
                स्वाद है भारत का! Visit us or order now!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-full font-semibold"
                  onClick={() => window.location.href = '/menu'}
                >
                  View Menu
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-semibold"
                >
                  Call Now
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

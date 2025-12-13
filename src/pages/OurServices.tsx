

import { 
  Bus, 
  Plane, 
  Train, 
  CreditCard, 
  Phone, 
  Camera, 
  Car, 
  Bike, 
  Truck, 
  Shield, 
  IceCream, 
  Home, 
  ShoppingCart, 
  PartyPopper, 
  MapPin, 
  PhoneCall, 
  Check 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OurServices = () => {
  return (
    <div className="min-h-screen bg-background">
     
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 text-lg px-4 py-2">
            🎯 Complete Business Solutions
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            स्वागत है <span className="font-bold text-primary">Namaste Bharat Group</span> में — travel, insurance, aur taste का bharosemand naam!
            <br />
            Hum apne customers ko multiple services provide karte hain jo life ko easier, safer, aur sweeter banati hain.
          </p>
        </div>

        {/* Services Grid - 2 per row */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Service 1: Ravi Enterprises - Tour & Travels */}
          <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">🚐 Ravi Enterprises</h2>
              <p className="text-sm opacity-90">Tour & Travels</p>
            </div>
            
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-primary mb-4 text-center">
                ✨ Aapki yatra shuru hoti hai comfort aur vishwas ke saath!
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <Plane className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-900">हवाई टिकट बुकिंग</span>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                  <Train className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-purple-900">रेलवे टिकट</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-900">पासपोर्ट और वीज़ा</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <Car className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-orange-900">ड्राइविंग लाइसेंस</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-pink-50 rounded-lg">
                  <Camera className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-pink-900">फोटो कॉपी और प्रिंटिंग</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                  <Phone className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-yellow-900">मोबाइल सेवाएं</span>
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <p className="text-xs font-medium">Konhwa more Mod, Gopalganj</p>
                </div>
                <a href="tel:9931584900" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  <PhoneCall className="w-4 h-4" />
                  9931584900
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Service 2: Vahan Beema Kendra */}
          <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">🚘 Vahan Beema Kendra</h2>
              <p className="text-sm opacity-90">वाहन बीमा केन्द्र</p>
            </div>
            
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-primary mb-4 text-center">
                🛡️ Aapki gaadi ko milega pura suraksha!
              </p>

              <div className="bg-orange-50 p-4 rounded-xl mb-4">
                <h3 className="text-sm font-bold text-orange-900 mb-3">हमारी सेवाएं:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-800">1st Party बीमा</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-800">3rd Party बीमा</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-800">तुरंत Policy Printing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-800">Renewal aur Claim में मदद</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-sm mb-3">🛵 किन वाहनों के लिए:</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex flex-col items-center p-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <Bike className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium">दो-पहिया</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <Car className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium">कार</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <Bus className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium">बस</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <Truck className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium">ट्रक</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <Truck className="w-6 h-6 text-orange-600 mb-1" />
                  <span className="text-xs font-medium">JCB</span>
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>Brands:</strong> LIC, SBI, Tata AIG, HDFC, ICICI
                </p>
                <a href="tel:9931584900" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  <PhoneCall className="w-4 h-4" />
                  9931584900
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Service 3: Namaste Bharat Ice Cream */}
          <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <IceCream className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">🍦 Namaste Bharat Ice Cream</h2>
              <p className="text-sm opacity-90">स्वाद है Bharat का!</p>
            </div>
            
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Gopalganj aur aas-paas ke gaon mein <strong>swadisht, swacch, aur taza ice cream</strong>
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-pink-50 rounded-lg">
                  <IceCream className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-pink-900">निर्माण और वितरण</h4>
                    <p className="text-xs text-pink-700">Roz taza production</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                  <Home className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-purple-900">घर पर डिलीवरी</h4>
                    <p className="text-xs text-purple-700">Seedhe aapke ghar tak</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-900">थोक आपूर्ति</h4>
                    <p className="text-xs text-indigo-700">Bulk orders available</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <PartyPopper className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-orange-900">इवेंट ऑर्डर</h4>
                    <p className="text-xs text-orange-700">Shaadi aur Functions ke liye</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-xl mb-4">
                <h4 className="font-bold text-xs mb-2">🌈 सभी स्वाद उपलब्ध:</h4>
                <div className="flex flex-wrap gap-1">
                  {["वेनिला", "चॉकलेट", "आम", "कुल्फी", "राजभोग", "स्ट्रॉबेरी"].map((flavor) => (
                    <Badge key={flavor} variant="outline" className="text-xs">
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <p className="text-xs font-medium">Konhwa more, Gopalganj</p>
                </div>
                <a href="tel:9931584900" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  <PhoneCall className="w-4 h-4" />
                  9931584900
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Service 4: Event & Function Services */}
          <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">🏢 Event & Function Services</h2>
              <p className="text-sm opacity-90">Complete Event Solutions</p>
            </div>
            
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Shaadi, janamdin, aur celebrations ke liye <strong>complete ice cream stalls</strong>
              </p>

              <div className="space-y-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <IceCream className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-sm font-bold text-green-900 mb-1">वहीं पर Ice Cream</h4>
                  <p className="text-xs text-green-700">Aapke venue par taza serving</p>
                </div>

                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <PartyPopper className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="text-sm font-bold text-teal-900 mb-1">सजावट और सेटअप</h4>
                  <p className="text-xs text-teal-700">Sundar stall arrangement</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">मित्रवत सेवा</h4>
                  <p className="text-xs text-blue-700">Professional team ka support</p>
                </div>
              </div>

              <div className="text-center pt-4 border-t mt-4">
                <a href="tel:9931584900" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  <PhoneCall className="w-4 h-4" />
                  9931584900
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Commitment */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">💼 हमारी प्रतिबद्धता</CardTitle>
            <CardDescription className="text-lg">
              Quality जो महसूस होती है, Service जिस पर भरोसा है
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">विश्वसनीय सेवाएं</h4>
                <p className="text-sm text-muted-foreground">Ek hi jagah par</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-bold mb-2">तेज़ और भरोसेमंद</h4>
                <p className="text-sm text-muted-foreground">Hamesha support</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold mb-2">स्थानीय और मित्रवत</h4>
                <p className="text-sm text-muted-foreground">Expert staff</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">गुणवत्ता सेवा</h4>
                <p className="text-sm text-muted-foreground">Jis par aap bharosa kar sakte hain</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ✨ Namaste Bharat Group
          </h2>
          <p className="text-xl md:text-2xl font-semibold mb-6">
            हर जरूरत, एक ही ठिकाना!
          </p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Travel se lekar taste tak, protection se lekar khushi tak — hum roz aapko best serve karte hain!
          </p>
          <div className="mt-6">
            <a 
              href="tel:9931584900" 
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              हमें कॉल करें: 9931584900
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OurServices;

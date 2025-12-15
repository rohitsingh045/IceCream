import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, GraduationCap, Heart, Award, Star, CheckCircle, Phone, Mail, MapPin, Sparkles, Gift, TrendingUp, Shield, Clock, IceCream, Package, Truck, Wrench, PartyPopper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
  const jobRoles = [
    {
      icon: IceCream,
      title: "Ice Cream Maker",
      description: "Ice cream banane aur machine handle karne ka kaam",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Package,
      title: "Packaging Assistant",
      description: "Ice cream ko pack karne, label lagane aur store ready karne ka kaam",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Truck,
      title: "Delivery & Selling Staff",
      description: "Ice cream ko city, town aur gaon tak pahunchana",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Wrench,
      title: "Helper / Cleaner",
      description: "Factory aur shop me cleanliness aur maintenance ka dhyaan rakhna",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: PartyPopper,
      title: "Event Vendor Partner",
      description: "Shaadi aur function me ice cream stall sambhalna",
      color: "from-orange-500 to-red-500"
    },
  ];

  const eligibility = [
    "Uneducated / 10th / 12th pass",
    "Honest aur hardworking log",
    "Gopalganj aur nearby towns/villages ke residents",
    "Age: 18 se 45 saal tak",
    "(Experience zaruri nahi — training hum dete hain!)"
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Friendly & Safe Work Environment",
      description: "Aapki safety aur comfort hamari priority hai"
    },
    {
      icon: GraduationCap,
      title: "Free Training & Uniform",
      description: "Complete job training aur professional uniform bilkul free"
    },
    {
      icon: TrendingUp,
      title: "Regular Payment & Growth",
      description: "Time par salary aur career growth ki guarantee"
    },
    {
      icon: Gift,
      title: "Festive Season Bonus",
      description: "Tyohaaron par special bonus aur incentives"
    },
    {
      icon: Heart,
      title: "Respect & Teamwork",
      description: "Ek parivaar ki tarah kaam karne ka mahaul"
    },
    {
      icon: Award,
      title: "Best Employee Recognition",
      description: "Mehnat ka samman aur awards ka mouka"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
    
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-16 mb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div className="relative text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
            </div>
            <Badge className="mb-4 text-sm px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white">
              🌱 We're Hiring
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Career at Namaste Bharat
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              हर हाथ को काम, हर मुस्कान में स्वाद।
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Namaste Bharat me hum sirf ice cream nahi banate — hum <span className="font-bold text-primary">mauke banate hain</span>.
            </p>
          </div>
        </div>

        {/* Our Mission */}
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                  Our Mission
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-5 text-center">
                <p className="text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20">
                  "हर व्यक्ति को एक इमानदार रोज़गार का अवसर देना।"
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hamari company un sabhi logo ko samarpit hai jo <span className="font-semibold text-primary">mehnat se apna bhavishya</span> badalna chahte hain — 
                  chahe unhone padhaai 10th tak ki ho, 12th tak, ya wo uneducated hi kyu na ho.
                </p>
                <p className="text-base text-muted-foreground italic bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                  <Award className="w-5 h-5 inline text-yellow-600 mr-2" />
                  Hum believe karte hain ki talent aur dedication <span className="font-bold text-foreground">degree se nahi, dil se</span> aata hai.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Job Roles */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Briefcase className="w-8 h-8 text-primary" />
              Available Job Roles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground">
              Simple aur respectful job roles jisme <span className="font-semibold text-primary">training bhi di jaati hai</span> 👇
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobRoles.map((job, index) => (
              <Card 
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 relative group"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${job.color}`}></div>
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${job.color} rounded-2xl shadow-lg`}>
                    <job.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  <Badge className="mt-2" variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Training Included
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Who Can Apply */}
        <Card 
          className="mb-12 overflow-hidden border-2 border-primary/10"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
          }}
        >
          <CardContent className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Who Can Apply
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {eligibility.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-foreground font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-lg font-bold text-foreground mb-2">
                सबसे बड़ी बात — Experience zaruri nahi!
              </p>
              <p className="text-muted-foreground">
                Hum aapko sab kuch sikhayenge. Bas mehnat aur imandari chahiye! 💪
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Join Namaste Bharat */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-yellow-500" />
              Why Join Namaste Bharat?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground">
              Yahaan kaam karna matlab ek parivaar ka hissa banna 🏠
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)",
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Apply */}
        <Card 
          className="mb-12 overflow-hidden border-2 border-primary/20 shadow-2xl"
        >
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 text-white text-center">
            <Phone className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How to Apply</h2>
            <p className="text-lg text-white/90">
              Interested candidates apna naam, mobile number, aur address ke sath apply kar sakte hain
            </p>
          </div>
          
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Email Us</h3>
                <a href="mailto:careers@namastebharat.com" className="text-primary hover:underline font-semibold break-all">
                  raviinterprizes@namastebharat.com
                </a>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Call / WhatsApp</h3>
                <a href="tel:+919931584900" className="text-primary hover:underline font-semibold">
                  +91-9931584900
                </a>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Visit Office</h3>
                <p className="text-muted-foreground text-sm">
                  Namaste Bharat Ice Cream Factory,Konhwa more, Gopalganj
                </p>
              </div>
            </div>

            <div className="mt-10 text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-300">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Office Timing</h3>
              <p className="text-muted-foreground mb-4">Monday - Sunday: 8:00 AM - 9:00 PM</p>
              <p className="text-sm text-muted-foreground italic">
                Aap walk-in bhi kar sakte hain! Appointment ki zarurat nahi.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Team Today! 🎉
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            <span className="font-bold text-primary">Namaste Bharat</span> – स्वाद है Bharat का, और सम्मान हर काम का! 🇮🇳
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@namastebharat.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Apply Now
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-primary"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Careers;

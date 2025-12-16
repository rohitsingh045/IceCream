import { Heart, IceCream, MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Clock, Award, Truck } from "lucide-react";
import { Link } from "react-router-dom";

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 overflow-hidden mt-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      
  {/* Ice cream cone decorations */}
  <div className="absolute top-8 left-8 opacity-10">
    <IceCream className="w-24 h-24 text-white" />
  </div>
  <div className="absolute bottom-8 right-8 opacity-10">
    <IceCream className="w-28 h-28 text-white rotate-12" />
  </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Namaste Bharat Ice Cream" 
                className="h-12 w-auto object-contain rounded-xl shadow-lg"
                onError={(e) => {
                  // Fallback to icon if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div style={{ display: 'none' }} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <IceCream className="w-7 h-7 text-white" />
                  <span className="text-xl font-bold text-white">नमस्ते भारत</span>
                </div>
                <span className="text-xs text-white/70 ml-9">ICE CREAM</span>
              </div>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              🍨 हर स्वाद में एक मुस्कान
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              India's favorite premium ice cream brand. Made with love and natural ingredients.
            </p>
            <div className="flex items-center gap-2.5">
              <a 
                href="https://www.facebook.com/share/1AQNLDpmJV/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transition-all bg-white/20 hover:bg-blue-500/50 p-2.5 rounded-full shadow-lg"
                title="Follow Ravi Singh on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/namaste_bharat_icecream?igsh=d2pweHdlYWRyZjhz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transition-all bg-white/20 hover:bg-gradient-to-br hover:from-purple-500/50 hover:to-pink-500/50 p-2.5 rounded-full shadow-lg"
                title="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/919931584900?text=Hi!%20I%20want%20to%20know%20more%20about%20Namaste%20Bharat%20Ice%20Cream" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transition-all bg-white/20 hover:bg-green-500/50 p-2.5 rounded-full shadow-lg"
                title="Chat with us on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-white rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/about" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                About Us
              </a></li>
              <li><a href="/menu" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Our Menu
              </a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Contact Us
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                FAQs
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Franchise
              </a></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-white rounded-full"></div>
              Popular Flavors
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Premium Kesar Pista
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Chocolate Fudge
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Mango Kulfi
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Rose Rabdi
              </a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white"></span>
                Butterscotch Crunch
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-white rounded-full"></div>
              Get in Touch
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5 group">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white/90 font-medium text-xs">Our Store</p>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Ravi Enterprizes and Namaste Bharat Ice Cream,<br />
                    Konhwa more,Gopalganj<br />
                    Bihar 841428
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 group">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                  <Phone className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white/90 font-medium text-xs">Call Us</p>
                  <a href="tel:+919931584900" className="text-white/70 hover:text-white transition-colors text-xs">
                    +91 9931584900
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 group">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                  <Mail className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <div>
                  <p className="text-white/90 font-medium text-xs">Email Us</p>
                  <a href="mailto:hello@namastebharaticecream.com" className="text-white/70 hover:text-white transition-colors text-xs break-all">
                    hello@namastebharat.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 group">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                  <Clock className="w-4 h-4 text-white flex-shrink-0" />
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span>in India</span>
            </div>
            <p className="text-sm text-white/80 font-medium">
              © {new Date().getFullYear()} <span className="font-bold">नमस्ते भारत</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

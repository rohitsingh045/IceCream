import { Heart, IceCream } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <IceCream className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-foreground">नमस्ते भारत</span>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-md">
            हर स्वाद में एक मुस्कान — A smile in every scoop 🍨✨
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>in India</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2024 Namaste Bharat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

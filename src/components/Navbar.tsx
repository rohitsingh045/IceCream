import { Link, useLocation } from "react-router-dom";
import { IceCream } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <IceCream className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">नमस्ते भारत</span>
              <span className="text-xs text-muted-foreground">Namaste Bharat</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/menu") ? "text-primary" : "text-foreground"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

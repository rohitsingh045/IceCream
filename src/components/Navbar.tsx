import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { Facebook, Instagram, MessageCircleMore, User, LogIn, Menu, Search, LogOut, X, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CartSheet from "./CartSheet";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
    // Add your search logic here
  };
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Our Products" },
    { path: "/services", label: "Our Services" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];
  
  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-white/98 shadow-xl border-b border-primary/20' 
          : 'backdrop-blur-md bg-white/95 shadow-lg border-b border-primary/10'
      }`}
    >
      {/* Main navbar */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Namaste Bharat Ice Cream" 
                className={`w-auto object-contain rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md ${
                  isScrolled ? 'h-10 sm:h-11' : 'h-11 sm:h-13'
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.classList.remove('hidden');
                    fallback.classList.add('flex');
                  }
                }}
              />
              {/* Fallback text logo */}
              <div className="hidden fallback-logo bg-gradient-to-br from-primary via-secondary to-accent rounded-xl items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 w-11 h-11 sm:w-13 sm:h-13">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                    नमस्ते
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-white/90 -mt-0.5">Bharat</div>
                  <div className="text-[7px] sm:text-[8px] text-white/80 font-medium -mt-0.5">ICE CREAM</div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight transition-all duration-300 ${
                isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}>
                Namaste Bharat
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Premium Ice Cream</p>
            </div>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center max-w-3xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group whitespace-nowrap ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-full shadow-lg" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
            ))}

            {/* ADMIN ONLY LINK in same row */}
            {user && user.role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                className="relative px-4 py-2 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg whitespace-nowrap"
              >
                Admin Dashboard
              </NavLink>
            )}
          </div>
          
          {/* Desktop - Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {/* Desktop Search */}
            <div className="relative group">
              {!isSearchOpen ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <Search className="w-4 h-4" />
                </Button>
              ) : (
                <form onSubmit={handleSearch} className="relative flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                    <Input
                      type="text"
                      placeholder="Search flavors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="pl-10 pr-10 py-2 h-9 w-64 text-sm border-2 border-primary/30 text-gray-900 placeholder:text-gray-400 focus:border-primary rounded-full transition-all shadow-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 px-3 rounded-full hover:bg-primary/10 transition-all">
                      <Avatar className="h-8 w-8 ring-2 ring-primary/30 hover:ring-primary transition-all mr-2">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden xl:inline">{user?.name?.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/account')} className="cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="h-9 px-4 text-xs border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary rounded-full font-semibold transition-all shadow-sm hover:shadow-md"
                  >
                    <LogIn className="w-3.5 h-3.5 mr-1.5" />
                    Login
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/signup')}
                    className="h-9 px-4 text-xs bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg rounded-full font-semibold transition-all shadow-md hover:scale-105"
                  >
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
            
            <CartSheet />
            
            {/* Social Links - Always Visible on Desktop */}
            <div className="flex items-center gap-3 pl-3 ml-2 border-l-2 border-gray-200">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-50 to-purple-100 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-purple-600 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-red-50 to-red-100 hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                aria-label="MessageCircleMore"
              >
                <MessageCircleMore className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Mobile - Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <CartSheet />
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9 border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary rounded-full transition-all shadow-sm"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[380px] bg-gradient-to-br from-white to-gray-50">
                <SheetHeader>
                  <SheetTitle className="text-gray-900 text-xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                    <Input
                      type="text"
                      placeholder="Search flavors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-3 py-2 h-10 w-full text-sm rounded-full border-2 border-primary/20 focus:border-primary placeholder:text-gray-400 shadow-sm"
                    />
                  </form>

                  {/* Navigation Links */}
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-semibold py-3 px-4 rounded-lg transition-all ${
                          isActive(link.path) 
                            ? "text-primary bg-primary/10 shadow-sm" 
                            : "text-gray-700 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200" />

                  {/* Auth Section */}
                  <div className="flex flex-col gap-3">
                    {isAuthenticated ? (
                      <div className="flex flex-col items-center gap-4 pt-2 pb-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4">
                        <Avatar className="h-16 w-16 ring-4 ring-primary/30 shadow-lg">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="text-base font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                        <Button 
                          variant="outline"
                          className="w-full rounded-full border-2 border-primary/30 text-primary hover:bg-primary/10 font-semibold shadow-sm"
                          onClick={() => {
                            navigate('/account');
                            setIsOpen(false);
                          }}
                        >
                          <UserCircle className="w-4 h-4 mr-2" />
                          My Account
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full rounded-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold shadow-sm"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button 
                          variant="outline"
                          className="w-full rounded-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold shadow-sm h-11"
                          onClick={() => {
                            navigate('/login');
                            setIsOpen(false);
                          }}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                        <Button 
                          className="w-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold shadow-md hover:shadow-lg h-11"
                          onClick={() => {
                            navigate('/signup');
                            setIsOpen(false);
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200" />

                  {/* Social Links */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
                    <div className="flex items-center justify-center gap-4">
                      <a 
                        href="https://facebook.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-600 group transition-all hover:scale-110"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-50 to-purple-100 shadow-md hover:shadow-lg hover:from-pink-500 hover:to-purple-600 group transition-all hover:scale-110"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                      </a>
                      <a 
                        href="https://whatsapp.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-md hover:shadow-lg hover:from-red-500 hover:to-red-600 group transition-all hover:scale-110"
                        aria-label="YouTube"
                      >
                        <MessageCircleMore className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
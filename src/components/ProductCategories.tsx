import { useState, useRef, useEffect } from "react";
import { IceCream, Coffee, Cake, Candy, Lollipop, PartyPopper, Tent } from "lucide-react";
import ProductCarousel from "./ProductCarousel";

// Import product images
import chocolateBar from "@/assets/products/chocolate-bar.png";
import vanillaBar from "@/assets/products/vanilla-bar.png";
import strawberryBar from "@/assets/products/strawberry-bar.png";
import mangoBar from "@/assets/products/mango-bar.png";
import orangeBar from "@/assets/products/orange-bar.png";
import chocolateCone from "@/assets/products/chocolate-cone.png";
import strawberryCone from "@/assets/products/strawberry-cone.png";
import vanillaCone from "@/assets/products/vanilla-cone.png";
import butterscotchCone from "@/assets/products/butterscotch-cone.png";
import chocoVanillaCone from "@/assets/products/choco-vanilla-cone.png";
import kesarPistaKulfi from "@/assets/products/kesar-pista-kulfi.png";
import mangoKulfi from "@/assets/products/mango-kulfi.png";
import malaiKulfi from "@/assets/products/malai-kulfi.png";
import roseKulfi from "@/assets/products/rose-kulfi.png";
import pistaKulfi from "@/assets/products/pista-kulfi.png";
import familyCup from "@/assets/products/family-cup.png";
import twistPop from "@/assets/products/twist-pop.png";
import iceSandwich from "@/assets/products/ice-sandwich.png";
import iceCreamCake from "@/assets/products/ice-cream-cake.png";

const categories = [
  {
    id: "bar-baar",
    name: "Bar Baar",
    icon: IceCream,
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    products: [
      { name: "Chocolate Bar", image: chocolateBar },
      { name: "Vanilla Bar", image: vanillaBar },
      { name: "Strawberry Bar", image: strawberryBar },
      { name: "Mango Bar", image: mangoBar },
      { name: "Orange Bar", image: orangeBar },
    ]
  },
  {
    id: "cone-masti",
    name: "Cone-Masti",
    icon: IceCream,
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    products: [
      { name: "Chocolate Cone", image: chocolateCone },
      { name: "Strawberry Cone", image: strawberryCone },
      { name: "Vanilla Cone", image: vanillaCone },
      { name: "Butterscotch Cone", image: butterscotchCone },
      { name: "Choco-Vanilla Cone", image: chocoVanillaCone },
    ]
  },
  {
    id: "kulfi-baaz",
    name: "Kulfi-Baaz",
    icon: Lollipop,
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    products: [
      { name: "Kesar Pista Kulfi", image: kesarPistaKulfi },
      { name: "Mango Kulfi", image: mangoKulfi },
      { name: "Malai Kulfi", image: malaiKulfi },
      { name: "Rose Kulfi", image: roseKulfi },
      { name: "Pista Kulfi", image: pistaKulfi },
    ]
  },
  {
    id: "cup-masti",
    name: "Cup-Masti",
    icon: Coffee,
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    products: [
      { name: "Family Cup", image: familyCup },
      { name: "Solo Cup", image: vanillaCone },
      { name: "Party Cup", image: familyCup },
      { name: "Premium Cup", image: familyCup },
    ]
  },
  {
    id: "novelties",
    name: "Novelties",
    icon: PartyPopper,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    products: [
      { name: "Twist Pop", image: twistPop },
      { name: "Ice Sandwich", image: iceSandwich },
      { name: "Candy Pop", image: twistPop },
      { name: "Fruity Bar", image: strawberryBar },
    ]
  },
  {
    id: "party-sharty",
    name: "Party Sharty",
    icon: PartyPopper,
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    products: [
      { name: "Party Pack", image: familyCup },
      { name: "Mega Pack", image: familyCup },
      { name: "Family Pack", image: familyCup },
      { name: "Kids Pack", image: familyCup },
    ]
  },
  {
    id: "tub-shub",
    name: "Tub Shub",
    icon: Coffee,
    color: "bg-gradient-to-br from-indigo-400 to-purple-500",
    products: [
      { name: "500ml Tub", image: familyCup },
      { name: "1L Tub", image: familyCup },
      { name: "2L Tub", image: familyCup },
      { name: "Family Tub", image: familyCup },
    ]
  },
  {
    id: "cake-pastry",
    name: "Cake & Pastry",
    icon: Cake,
    color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    products: [
      { name: "Ice Cream Cake", image: iceCreamCake },
      { name: "Pastry", image: iceCreamCake },
      { name: "Mini Cake", image: iceCreamCake },
      { name: "Premium Cake", image: iceCreamCake },
    ]
  },
  {
    id: "candies",
    name: "Candies",
    icon: Candy,
    color: "bg-gradient-to-br from-red-400 to-pink-500",
    products: [
      { name: "Candy Mix", image: twistPop },
      { name: "Lollipop", image: twistPop },
      { name: "Gummy Bears", image: twistPop },
      { name: "Toffee Mix", image: twistPop },
    ]
  },
  {
    id: "chocobar",
    name: "Chocobar",
    icon: IceCream,
    color: "bg-gradient-to-br from-rose-400 to-red-500",
    products: [
      { name: "Dark Chocobar", image: chocolateBar },
      { name: "Milk Chocobar", image: chocolateBar },
      { name: "White Chocobar", image: vanillaBar },
      { name: "Nuts Chocobar", image: chocolateBar },
    ]
  },
  {
    id: "sorbet",
    name: "Sorbet",
    icon: Lollipop,
    color: "bg-gradient-to-br from-orange-400 to-pink-500",
    products: [
      { name: "Mango Sorbet", image: mangoBar },
      { name: "Lemon Sorbet", image: vanillaBar },
      { name: "Berry Sorbet", image: strawberryBar },
      { name: "Orange Sorbet", image: orangeBar },
    ]
  },
  {
    id: "kids-carnival",
    name: "Kids Carnival",
    icon: Tent,
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    products: [
      { name: "Fun Pack", image: familyCup },
      { name: "Cartoon Pop", image: twistPop },
      { name: "Rainbow Cup", image: familyCup },
      { name: "Kids Special", image: twistPop },
    ]
  },
];

const ProductCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(categories[0]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll if user has manually selected a category
    if (selectedCategory && carouselRef.current && hasUserInteracted) {
      carouselRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedCategory, hasUserInteracted]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Our Products
          </h2>
          <div className="w-20 h-1 bg-white/80 mx-auto rounded-full shadow-lg"></div>
          <p className="text-white/90 text-sm md:text-base mt-3">Select a category to explore our delicious products</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory?.id === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setHasUserInteracted(true);
                }}
                className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                  isSelected ? "scale-105" : "hover:scale-105"
                }`}
              >
                <div 
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl ${category.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 ${
                    isSelected 
                      ? "ring-4 ring-white/50 shadow-2xl" 
                      : "hover:ring-2 hover:ring-white/30"
                  }`}
                >
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
                  )}
                </div>
                <span className={`text-xs md:text-sm font-semibold text-white text-center transition-all ${
                  isSelected ? "scale-105" : ""
                }`}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Inline Product Carousel */}
        <div ref={carouselRef} className="relative">
        {selectedCategory && (
            <ProductCarousel
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
              categoryColor={selectedCategory.color}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;

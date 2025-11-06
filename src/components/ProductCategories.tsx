import { useState } from "react";
import { IceCream, Coffee, Cake, Candy, Lollipop, PartyPopper, Tent } from "lucide-react";
import ProductModal from "./ProductModal";

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
      { name: "Chocolate Bar", price: "₹50", image: chocolateBar },
      { name: "Vanilla Bar", price: "₹45", image: vanillaBar },
      { name: "Strawberry Bar", price: "₹50", image: strawberryBar },
      { name: "Mango Bar", price: "₹55", image: mangoBar },
      { name: "Orange Bar", price: "₹55", image: orangeBar },
    ]
  },
  {
    id: "cone-masti",
    name: "Cone-Masti",
    icon: IceCream,
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    products: [
      { name: "Chocolate Cone", price: "₹60", image: chocolateCone },
      { name: "Strawberry Cone", price: "₹60", image: strawberryCone },
      { name: "Vanilla Cone", price: "₹55", image: vanillaCone },
      { name: "Butterscotch Cone", price: "₹65", image: butterscotchCone },
      { name: "Choco-Vanilla Cone", price: "₹65", image: chocoVanillaCone },
    ]
  },
  {
    id: "kulfi-baaz",
    name: "Kulfi-Baaz",
    icon: Lollipop,
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    products: [
      { name: "Kesar Pista Kulfi", price: "₹70", image: kesarPistaKulfi },
      { name: "Mango Kulfi", price: "₹65", image: mangoKulfi },
      { name: "Malai Kulfi", price: "₹60", image: malaiKulfi },
      { name: "Rose Kulfi", price: "₹70", image: roseKulfi },
      { name: "Pista Kulfi", price: "₹70", image: pistaKulfi },
    ]
  },
  {
    id: "cup-masti",
    name: "Cup-Masti",
    icon: Coffee,
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
    products: [
      { name: "Family Cup", price: "₹100", image: familyCup },
      { name: "Solo Cup", price: "₹50", image: vanillaCone },
      { name: "Party Cup", price: "₹80", image: familyCup },
      { name: "Premium Cup", price: "₹120", image: familyCup },
    ]
  },
  {
    id: "novelties",
    name: "Novelties",
    icon: PartyPopper,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    products: [
      { name: "Twist Pop", price: "₹40", image: twistPop },
      { name: "Ice Sandwich", price: "₹45", image: iceSandwich },
      { name: "Candy Pop", price: "₹35", image: twistPop },
      { name: "Fruity Bar", price: "₹50", image: strawberryBar },
    ]
  },
  {
    id: "party-sharty",
    name: "Party Sharty",
    icon: PartyPopper,
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    products: [
      { name: "Party Pack", price: "₹500", image: familyCup },
      { name: "Mega Pack", price: "₹800", image: familyCup },
      { name: "Family Pack", price: "₹600", image: familyCup },
      { name: "Kids Pack", price: "₹400", image: familyCup },
    ]
  },
  {
    id: "tub-shub",
    name: "Tub Shub",
    icon: Coffee,
    color: "bg-gradient-to-br from-indigo-400 to-purple-500",
    products: [
      { name: "500ml Tub", price: "₹200", image: familyCup },
      { name: "1L Tub", price: "₹350", image: familyCup },
      { name: "2L Tub", price: "₹600", image: familyCup },
      { name: "Family Tub", price: "₹450", image: familyCup },
    ]
  },
  {
    id: "cake-pastry",
    name: "Cake & Pastry",
    icon: Cake,
    color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    products: [
      { name: "Ice Cream Cake", price: "₹800", image: iceCreamCake },
      { name: "Pastry", price: "₹120", image: iceCreamCake },
      { name: "Mini Cake", price: "₹400", image: iceCreamCake },
      { name: "Premium Cake", price: "₹1200", image: iceCreamCake },
    ]
  },
  {
    id: "candies",
    name: "Candies",
    icon: Candy,
    color: "bg-gradient-to-br from-red-400 to-pink-500",
    products: [
      { name: "Candy Mix", price: "₹30", image: twistPop },
      { name: "Lollipop", price: "₹20", image: twistPop },
      { name: "Gummy Bears", price: "₹40", image: twistPop },
      { name: "Toffee Mix", price: "₹35", image: twistPop },
    ]
  },
  {
    id: "chocobar",
    name: "Chocobar",
    icon: IceCream,
    color: "bg-gradient-to-br from-rose-400 to-red-500",
    products: [
      { name: "Dark Chocobar", price: "₹55", image: chocolateBar },
      { name: "Milk Chocobar", price: "₹50", image: chocolateBar },
      { name: "White Chocobar", price: "₹60", image: vanillaBar },
      { name: "Nuts Chocobar", price: "₹65", image: chocolateBar },
    ]
  },
  {
    id: "sorbet",
    name: "Sorbet",
    icon: Lollipop,
    color: "bg-gradient-to-br from-orange-400 to-pink-500",
    products: [
      { name: "Mango Sorbet", price: "₹80", image: mangoBar },
      { name: "Lemon Sorbet", price: "₹75", image: vanillaBar },
      { name: "Berry Sorbet", price: "₹85", image: strawberryBar },
      { name: "Orange Sorbet", price: "₹80", image: orangeBar },
    ]
  },
  {
    id: "kids-carnival",
    name: "Kids Carnival",
    icon: Tent,
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    products: [
      { name: "Fun Pack", price: "₹150", image: familyCup },
      { name: "Cartoon Pop", price: "₹40", image: twistPop },
      { name: "Rainbow Cup", price: "₹60", image: familyCup },
      { name: "Kids Special", price: "₹100", image: twistPop },
    ]
  },
];

const ProductCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Our Products
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
                >
                  <div 
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow`}
                  >
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-white text-center">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedCategory && (
        <ProductModal
          category={selectedCategory}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
};

export default ProductCategories;

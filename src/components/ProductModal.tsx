import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  price: string;
  image: string; // Now it's an imported image path
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface ProductModalProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ category, isOpen, onClose }: ProductModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-gradient-to-br from-primary via-secondary to-accent border-0">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {category.products.map((product, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 md:p-16 min-h-[500px]">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-6 text-white">
                      <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        {product.name}
                      </h2>
                      <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`h-1 rounded-full transition-all ${
                              i === index ? "w-12 bg-white" : "w-3 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-semibold">
                        {product.price}
                      </p>
                    </div>

                    {/* Right Product Image */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-full max-w-md">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
                        <div className="relative bg-gradient-to-br from-white/20 to-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto object-contain animate-float drop-shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {category.products.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex 
                    ? "bg-white w-8" 
                    : "bg-white/50 hover:bg-white/70 w-2"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 right-8 text-white text-sm font-medium">
            {selectedIndex + 1} / {category.products.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

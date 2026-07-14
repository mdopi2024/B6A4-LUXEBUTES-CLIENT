"use client"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const banners = [
  { src: "/images/banner1.jpg", alt: "Fresh meal 1" },
  { src: "/images/banner2.jpg", alt: "Fresh meal 2" },
  { src: "/images/banner3.jpg", alt: "Fresh meal 3" },
  { src: "/images/banner4.jpg", alt: "Fresh meal 4" },
]

const Banner = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <div className="relative w-full mx-auto">
      <Carousel
        className="w-full h-80 lg:h-120"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-80 lg:h-120">
                <Card className="w-full h-80 lg:h-120 p-0 border-teal-800/20 overflow-hidden rounded-none">
                  <CardContent className="relative flex h-80 lg:h-120 items-center justify-center p-0">
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="w-full h-70vh lg:h-120 object-cover"
                    />
                    {/* subtle brand-tinted overlay at the bottom for readability if you add text later */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-teal-800/60 via-teal-800/10 to-transparent pointer-events-none" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-teal-800 text-[#FBBF24] border-none hover:bg-teal-900 hover:text-[#FBBF24]" />
        <CarouselNext className="right-4 bg-teal-800 text-[#FBBF24] border-none hover:bg-teal-900 hover:text-[#FBBF24]" />
      </Carousel>
    </div>
  );
};

export default Banner;



import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const Banner = () => {
  return (
    <Carousel className="w-5/6 h-80 lg:h-120   rounded-md ">
      <CarouselContent>
          <CarouselItem  className="h-full  ">
            <div className="w-full h-80 lg:h-120  ">
              <Card className="w-full  h-80 lg:h-120  p-0 ">
                <CardContent className="flex h-80 lg:h-120  items-center justify-center p-0 ">
                 <img src='/images/banner1.jpg' alt="food" className="w-full h-80 lg:h-120  object-cover rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className="h-full  ">
            <div className="w-full h-80 lg:h-120  ">
              <Card className="w-full  h-80 lg:h-120  p-0 ">
                <CardContent className="flex h-80 lg:h-120  items-center justify-center p-0 ">
                 <img src='/images/banner2.jpg' alt="food" className="w-full h-80 lg:h-120  object-cover rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className="h-full  ">
            <div className="w-full h-80 lg:h-120  ">
              <Card className="w-full  h-80 lg:h-120  p-0 ">
                <CardContent className="flex h-80 lg:h-120  items-center justify-center p-0 ">
                 <img src='/images/banner3.jpg' alt="food" className="w-full h-80 lg:h-120  object-cover rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className="h-full  ">
            <div className="w-full h-80 lg:h-120  ">
              <Card className="w-full  h-80 lg:h-120  p-0 ">
                <CardContent className="flex h-80 lg:h-120  items-center justify-center p-0 ">
                 <img src='/images/banner4.jpg' alt="food" className="w-full h-80 lg:h-120  object-cover rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          
        
          
      </CarouselContent>
      <CarouselPrevious className="text-gray-600" />
      <CarouselNext  className="text-gray-600" />
    </Carousel>
  );
};

export default Banner;


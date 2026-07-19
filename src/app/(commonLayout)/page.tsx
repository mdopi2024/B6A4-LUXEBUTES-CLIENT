

import AboutSection from "@/components/modules/home/AboutSection";
import Banner from "@/components/modules/home/Banner";
import Features from "@/components/modules/home/Features";
import HowItWorksSection from "@/components/modules/home/HowItworksSection";
import LatestMenus from "@/components/modules/home/LatestMenus";
import OurPromise from "@/components/modules/home/OurPromise";



export default async function Home() {
  return (
    <div >

      <div className=" md:mx-0 flex justify-center">
        <Banner></Banner>
      </div>
      <div className="" >
        <AboutSection></AboutSection>
      </div>
      <div className="py-8 px-1 md:px-16 ">
        <LatestMenus></LatestMenus>
      </div>
      <div>
        <HowItWorksSection></HowItWorksSection>
      </div>
      <div>
         <Features></Features>
      </div>
      <div>
        <OurPromise></OurPromise>
      </div>

    </div>
  );
}



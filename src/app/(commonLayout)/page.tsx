import AboutSection from "@/components/modules/home/AboutSection";
import Banner from "@/components/modules/home/Banner";
import Footer from "@/components/modules/home/Footer";
import HowItWorksSection from "@/components/modules/home/HowItworksSection";
import LatestMenus from "@/components/modules/home/LatestMenus";



export default async function Home() {
  return (
    <div >

      <div className=" mt-5 mx-2 md:mx-0 flex justify-center">
        <Banner></Banner>
      </div>
      <div className="py-8 px-1 md:px-16 ">
        <LatestMenus></LatestMenus>
      </div>
      <div>
        <HowItWorksSection></HowItWorksSection>
      </div>

      <div className="" >
        <AboutSection></AboutSection>
      </div>
      <div className="" >
        <Footer></Footer>
      </div>
    </div>
  );
}

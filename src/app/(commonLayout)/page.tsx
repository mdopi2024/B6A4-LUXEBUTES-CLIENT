import AboutSection from "@/components/modules/home/AboutSection";
import Banner from "@/components/modules/home/Banner";
import Footer from "@/components/modules/home/Footer";
import HowItWorksSection from "@/components/modules/home/HowItworksSection";



export default async function Home() {
  return (
    <div >
      <div className=" mt-5 mx-2 md:mx-0 flex justify-center">
        <Banner></Banner>
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

import Main from "@/Layout/Main";
import DesignSection from "@/components/Home/DesignSection/DesignSection";
import Hero from "@/components/Home/Hero/Hero";
import SiteInfo from "@/components/Home/SiteInfo/SiteInfo";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Main
      title="Home page"
      description={"Home Description"}
      thumb={
        "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
      }
    >
      <div>
        {/* Hero */}
        <div>
          <Hero />
        </div>
        <div className="sm:px-6 px-1">
          <DesignSection />
        </div>
        <div className="sm:px-6 px-1">
          <SiteInfo />
        </div>
        <div className="sm:px-6 px-1">
          <Testimonials />
        </div>
      </div>
    </Main>
  );
}

import Main from "@/Layout/Main";
import DesignSection from "@/components/Home/DesignSection/DesignSection";
import Hero from "@/components/Home/Hero/Hero";
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
        <div>
          <DesignSection />
        </div>
        <div>Home page</div>
      </div>
    </Main>
  );
}

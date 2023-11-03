import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header/Navbar";
import SubNavbar from "@/components/shared/Header/SubNavbar";
import Head from "next/head";

const Main = ({ children, title, description, thumb }) => {
  return (
    <div className="container mx-auto my-14 md:my-9   overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumb} />
      </Head>
      <div className="">
        <Navbar />
      </div>
      <div>
        <SubNavbar />
      </div>
      <div className="">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;

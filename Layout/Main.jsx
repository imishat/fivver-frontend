import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header/Navbar";
import SubNavbar from "@/components/shared/Header/SubNavbar";
import Head from "next/head";

const Main = ({ children, title, description, thumb }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumb} />
      </Head>
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar />
      </div>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;

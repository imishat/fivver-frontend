import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header/Navbar";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { BsBackspace } from "react-icons/bs";

const AdminLayout = ({ children, title, description, thumb,routes }) => {
    // dashboard
    const [route, setRoute] = useState("dashboard");
  return (
    <div className="container mx-auto my-14 md:my-20   overflow-hidden">
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
      <div className="flex my-6 justify-start bg-blue-400 font-bold">
        <ul className="flex flex-wrap ">
          <li>
            <Link href={`/dashboard?n=${routes?.toLowerCase()}`}
              onClick={() => setRoute("dashboard")}
              className={`px-3 py-3 ${route==='dashboard'?'bg-[#1881cc]':""} h-full text-white flex items-center gap-2`}
            >
              <BsBackspace size={24} />
              Back to {routes}
            </Link>
          </li>
        </ul>
      </div>
      </div>
      <div className="">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;

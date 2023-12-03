
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Affiliate from "./Affiliate/Affiliate";
import Categories from "./Categories/Categories";
import Companies from "./Companies/Companies";
import Designs from "./Designs/Designs";
import Projects from "./Projects/Projects";
import SubCategory from "./SubCategory/SubCategory";
import Tags from "./Tags/Tags";


const Dashboard = () => {

  // router 
  const router = useRouter()
  // dashboard
  const [route, setRoute] = useState(router.query.n || "dashboard");
  return (
    <div className="my-0">
      {/* Dashboard navbar */}
      <div className="flex mb-6 mt-1 justify-center bg-[#1881cc] font-bold">
        <ul className="flex flex-wrap ">
          <li>
            <Link href={'/dashboard?n=dashboard'}
              onClick={() => setRoute("dashboard")}
              className={`px-3 py-3 inline-block ${route === 'dashboard' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=categories'}
              onClick={() => setRoute("categories")}
              className={`px-3 py-3 inline-block ${route === 'categories' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=subcategories'}
              onClick={() => setRoute("subcategories")}
              className={`px-3 py-3 inline-block ${route === 'subcategories' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              SubCategories
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=designs'}
              onClick={() => setRoute("designs")}
              className={`px-3 py-3 inline-block ${route === 'designs' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Designs
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=companies'}
              onClick={() => setRoute("companies")}
              className={`px-3 py-3 inline-block ${route === 'companies' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Companies
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=tags'}
              onClick={() => setRoute("tags")}
              className={`px-3 py-3 inline-block ${route === 'tags' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Tags
            </Link>
          </li>
          <li>
            <Link href={'/dashboard?n=affiliate'}
              onClick={() => setRoute("affiliate")}
              className={`px-3 py-3 inline-block ${route === 'affiliate' ? 'bg-[#1881cc]' : ""} h-full text-white`}
            >
              Affiliate
            </Link>
          </li>
        </ul>
      </div>
      {
        route === 'dashboard' && <Projects />
      }
      {
        route === 'designs' && <Designs />
      }
      {
        route === 'subcategories' && <SubCategory />
      }
      {
        route === 'companies' && <Companies />
      }
      {
        route === 'categories' && <Categories />
      }
      {
        route === 'tags' && <Tags />
      }
      {
        route === 'affiliate' && <Affiliate />
      }

    </div>
  );
};

export default Dashboard;

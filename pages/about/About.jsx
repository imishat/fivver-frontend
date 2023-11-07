import Main from "@/Layout/Main";
import Link from "next/link";

const About = () => {
  const designCat = [
    "Door hanger design",
    "Postcard Design",
    "Business Card Design",
    "Social Media Post Design",
    "Billboard Design",
    "Roll-up Banner Design",
    "Trade Show Banner Design",
    "Magazine Ads Design",
    "Podcast Cover Design",
    "Flyer Design",
    "Poster Design",
    "Brochure Design",
    "Facebook Cover Design",
    "Yard Sign Design",
    "Sidewalk Sign Design",
    "Menu Design",
    "Book Cover Design",
    "And Much More",
  ];
  return (
    <Main title={"About"}>
      <div className="mx-20">
        <div className="px-5 mt-12 py-6">
          <h2 className="text-3xl font-bold text-blue-400">About</h2>
        </div>
        <div>
          <p>
            We are a team of graphic designers. We are located in Sylhet,
            Bangladesh. We have worked with many online marketplaces since 2016
            with graphics design. And we've been successful in those
            marketplaces. Now we have created this site in 2023. We want to
            advance this site as well as many businesses around the world with
            our experience.
          </p>
        </div>
        <div className=" mt-20">
          <h2 className="text-xl font-bold text-blue-400 mb-5">
            What kind of designs do we like to create?
          </h2>
        </div>
        <div className="my-6 border-l px-12 border-[#0E97A1]">
          <div className="pb-4">
            <p>
              We like to create all kinds of business advertising designs. Print
              design and social media post design. Most of the designs we
              create.
            </p>
          </div>
          <div>
            <ul className="relative grid grid-cols-2">
              {designCat.map((design, i) => {
                return (
                  <li
                    className="before:content-['✓'] before:relative before:-left-2 before:text-blue-400 ml-6"
                    key={i}
                  >
                    {design}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* seconde */}
        <div className=" mt-20">
          <h2 className="text-xl font-bold text-blue-400 mb-5">
            Why should you choose us for your design?
          </h2>
        </div>
        <div className="my-6 border-l px-12 border-[#0E97A1]">
          <div className="pb-4">
            <p>
              We create every design for a specific business. Due to this the
              contents of each of our designs are of the right quality. After
              the business owners/customers see our designs, they no longer have
              to worry about the content of the designs. The business
              owner/customer can choose any design from the many designs created
              by us and easily edit that design with their own information
              through us. Or the business owner/customer can create a new design
              through us with some ideas from these designs. Also, if the
              business owner/customer already has a design idea of his own.
              However, we make designs according to their own ideas.
            </p>
          </div>
          <div className="py-8">
            <p>
              (
              <Link href={"/"} className="text-blue-400 font-bold">
                Click here
              </Link>{" "}
              to see which businesses we have already created designs for.)
            </p>
          </div>
          <div className="pb-4">
            <p>
              Also, we can design for any business other than the businesses we
              have already designed for. For that, the business owner/customer
              must give us their design information.
            </p>
          </div>
        </div>
        {/* third */}
        <div className=" mt-20">
          <h2 className="text-xl font-bold text-blue-400 mb-5">
            What are our future plans?
          </h2>
        </div>
        <div className="my-6 border-l px-12 border-[#0E97A1]">
          <div className="pb-4">
            <p>
              Our main goal is to create advertising designs for different types
              of businesses. We have already created many types of advertising
              designs. We will create more different types of advertising
              designs in the coming days. So that the advertising work of
              businesses becomes easier through our designs.
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default About;

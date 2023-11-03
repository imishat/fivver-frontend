import { useGetCompanies } from "@/components/queries/query/getCompanies.query";
import CompanyCard from "./CompanyCard";

function Companies() {
  // company Data
  const { data: companyData } = useGetCompanies({companyId:''});
  const companiesOptions = companyData?.data?.companies;
  return (
    <div className="md:flex gap-3">
      <div className="md:w-2/3 mx-auto">
        <div>
          {/* Client card */}
          <div className="py-3 space-y-3">
            {companiesOptions?.length
              ? companiesOptions?.map((company, i) => {
                  return <CompanyCard company={company} key={i} />;
                })
              : "No Projects"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;

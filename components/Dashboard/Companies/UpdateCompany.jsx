import { useUpdateCompany } from "@/components/queries/mutation/updateCompany.mutation";
import { useGetCompanies } from "@/components/queries/query/getCompanies.query";
import useToast from "@/components/utility/useToast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const UpdateCompany = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: updateCompany } = useUpdateCompany();

  // router
  const router = useRouter();

  // toast
  const { Toast, showToast } = useToast();

  // get query
  const companyId = router.query.companyId;

  // company Data
  const { data: companyData } = useGetCompanies({ companyId: companyId });
  const companiesOptions = companyData?.data?.company;

  // handle update
  const handleUpdate = (data) => {
    const companyUpdate = {
      label: data.label,
      value: data.value,
      id: companyId,
    };
    updateCompany(companyUpdate, {
      onSuccess: (res) => {
        showToast("Update Company", "success");
      },
      onError: (err) => {
        showToast(err?.message);
      },
    });
  };
  return (
    <div className="flex w-96 mx-auto">
      <Toast />
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full space-y-3"
      >
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="label"
          >
            {!companiesOptions?.label ? "Loading..." : "Title"}
          </label>
          <br />
          <input
            {...register("label", { required: true })}
            defaultValue={companiesOptions?.label}
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="label"
          />
        </div>
        <div className="w-full">
          <label
            className="bg-blue-200 capitalize text-blue-600 inline-block py-2 px-3 font-bold w-full"
            htmlFor="value"
          >
            slug
          </label>
          <br />
          <input
            {...register("value", { required: true })}
            defaultValue={companiesOptions?.value}
            className="input input-bordered rounded-none input-sm w-full inline-block"
            type="text"
            id="value"
          />
        </div>
        <button className="btn btn-block bg-blue-400">Update</button>
      </form>
    </div>
  );
};

export default UpdateCompany;

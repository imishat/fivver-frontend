import AdminLayout from "@/Layout/AdminLayout";

const index = () => {
    return (
        <AdminLayout title={'Company'}>
             <div className="flex justify-center w-full">
                <div className="mx-4 md:w-96">
                    <form>
                        <label className="" htmlFor="title">Name</label>
                        <input className="w-full px-2 input input-bordered py-2" type="text" />                       
                        <button className="px-4 py-2 btn btn-neutral my-2 w-full">Create</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default index;
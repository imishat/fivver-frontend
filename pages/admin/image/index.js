import AdminLayout from '@/Layout/AdminLayout';

const index = () => {
    return (
        <AdminLayout title={'Images'}>
             <div className="flex justify-center w-full">
                <div className="mx-4 md:w-96">
                    <form>
                        <label className="" htmlFor="title">File</label>
                        <input className="w-full file-input file-input-bordered" type="file" />
                        <button className="px-4 py-2 btn btn-neutral my-2 w-full">Upload</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default index;
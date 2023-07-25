import Main from "@/Layout/Main";


const designId = () => {
    return (
        <Main title='All Designs'>
            <div className="h-96 w-full relative">
                <img className="w-full h-full" src="/images/alldesign.png" alt="" />
                <div className="flex justify-center items-center h-96 z-40 text-black ">
                    <h3 className="absolute text-[#1C8CDD] text-4xl font-bold top-44 text-center z-20">Door Hanger Designs</h3>
                </div>
            </div>
        </Main>
    );
};

export default designId;
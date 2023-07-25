import Main from "@/Layout/Main";
import Card from "@/components/Card/Card";


const designId = () => {
    return (
        <Main title='All Designs'>
            {/* Design Title */}
            <div className="h-96 w-full relative">
                <img className="w-full h-full" src="/images/alldesign.png" alt="" />
                <div className="flex justify-center items-center  text-black ">
                    <h3 className="absolute text-[#1C8CDD] text-4xl font-bold top-44 text-center ">Door Hanger Designs</h3>
                </div>
            </div>
            {/* All Designs */}
            <div>
                <div className="flex justify-center text-center py-4">
                    <h2 className="text-2xl font-semibold">Click on the design you need to see more designs.</h2></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
               {
                 [1,1,1,1,1,1,1,1].map((item,i)=><Card key={i} />)
               }
            </div>
        </Main>
    );
};

export default designId;
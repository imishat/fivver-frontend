import Card from "../Card/Card";

const Related = () => {
    return (
        <div className="bg-[#F2F9FF] p-8 h-full">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold p-3">Related Design</h2>
            </div>
            <div className="grid sm:grid-cols-2 p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    [...Array(4).keys()].map((item,i)=><Card key={i} />)
                }
            </div>
        </div>
    );
};

export default Related;
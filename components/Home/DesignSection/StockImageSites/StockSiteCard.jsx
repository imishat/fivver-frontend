
const StockSiteCard = () => {
    return (
        <div className="rounded-lg border  !m-0 border-gray-500 overflow-hidden">
            <div className="h-32 flex justify-center px-2 items-center bg-white">
                <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQ80TRa7yzoxhM895hWqNt9Z6n5t4ModbYw&usqp=CAU" alt="" />
            </div>
            <div>
                <button className="w-full bg-gray-400 rounded-b-lg text-white py-1 text-xl">Click Here</button>
            </div>
        </div>
    );
};

export default StockSiteCard;
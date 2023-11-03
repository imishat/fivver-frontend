import StockSiteCard from "./StockSiteCard";

const StockImageSites = () => {
    const stockData = [
        {id:1,
            image:'/stock/stock1.png',
            url:'#'
        },
        {id:2,
            image:'/stock/stock2.png',
            url:'#'
        },
        {id:3,
            image:'/stock/stock3.png',
            url:'#'
        },
        {id:4,
            image:'/stock/stock4.png',
            url:'#'
        },
        {id:5,
            image:'/stock/stock5.png',
            url:'#'
        },
        {id:6,
            image:'/stock/stock6.png',
            url:'#'
        },
        {id:7,
            image:'/stock/stock7.png',
            url:'#'
        },
    ]
    return (
       <div className="rounded-lg overflow-hidden border border-blue-400">
        <div className="bg-blue-400 text-white px-3 py-2">
            <p>I've added links to a few stock image sites below. You can choose images from any of the sites linked below for your design.</p>
        </div>
        <div className="p-2 space-y-3 grid sm:grid-cols-2 md:grid-cols-1 gap-2">
            {
               stockData.map((item,i)=><StockSiteCard item={item} key={i} />)
            }
        </div>
       </div>
    );
};

export default StockImageSites;
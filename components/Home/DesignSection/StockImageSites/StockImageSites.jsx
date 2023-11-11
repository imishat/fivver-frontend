import StockSiteCard from "./StockSiteCard";

const StockImageSites = () => {
    const stockData = [
        {id:1,
            image:'/stock/01 Adobe Stock Logo.svg',
            url:'#'
        },
        {id:2,
            image:'/stock/01 Shutterstock_logo.svg',
            url:'#'
        },
        {id:3,
            image:'/stock/06 Dreamstime_Logo.png',
            url:'#'
        },
        {id:4,
            image:'/stock/03 iStock logo.png',
            url:'#'
        },
        {id:5,
            image:'/stock/04 123RF_Logo.png',
            url:'#'
        },
        {id:6,
            image:'/stock/06 Dreamstime_Logo.png',
            url:'#'
        },
        {id:7,
            image:'/stock/07 Vectezzy logo.png',
            url:'#'
        },
    ]
    return (
       <div className="rounded-lg overflow-hidden border border-blue-400">
        <div className="bg-blue-400 text-white px-1 py-1 text-center ">
            <p>I've added links to a few <br/>stock image sites below.<br/> You can choose images<br/> from any of the sites linked<br/> below for your design.</p>
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
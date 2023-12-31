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
            image:'/stock/alamy logo.png',
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
        {id:8,
            image:'/stock/05 Getty_Images_Logo.png',
            url:'#'
        },
        {id:9,
            image:'/stock/depositphotos.png',
            url:'#'
        },
    ]
    return (
       <div className="rounded-lg w-full overflow-hidden border border-[#1C8CDC]">
        <div className="bg-[#1881cc] text-white px-1 py-1 text-center ">
            <p>We have added links to some<br/> stock image sites below.<br/> You can choose images<br/> from any of the sites linked<br/> below for your design.</p>
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
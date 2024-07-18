import React from 'react'
import grid12 from '../../assest/grid12.jpg';

function GridComponent() {
  return (
    <div className="w-[100%] md:h-[100vh] mx-auto p-4 grid grid-cols-3 md:grid-cols-4 gap-4 pt-8">
      {/* Grill up a feast for him */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-dbc0/k2-_f3f2c897-d255-43d3-b9aa-e65d9e5c8966.v1.jpg?odnHeight=256&odnWidth=385&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">Grill Up</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop food
        </a>
      </div>

      {/* To Dad, in time */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-2 row-span-2"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-4ddc/k2-_5c58f2e9-2441-49de-84d9-82a2c7cfa7b8.v1.jpg?odnHeight=447&odnWidth=794&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="hidden lg:block text-xl text-white">Use pickup & delivery</p>
        <h2 className="mt-2 font-bold md:text-2xl text-xl text-white">To Dad</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop gifts
        </a>
      </div>

      {/* Level up his game */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-ba4b/k2-_d434b63b-a1fa-4890-a3f1-f0d04f364d61.v1.jpg?odnHeight=432&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">Level</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop sports
        </a>
      </div>

      {/* Here's to your dad's health */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-2"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-29fd/k2-_c8a60ce8-7e23-4159-90dd-2764f21eee70.v1.jpg?odnHeight=1156&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">
          Here's to your dad's health
        </h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop wellness
        </a>
      </div>

      {/* Laid-back looks he'll love */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-61f4/k2-_ea0e9a94-f1cd-4a84-a583-61da27d430a0.v1.jpg?odnHeight=512&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">
          Laid-back looks he'll love
        </h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop men's
        </a>
      </div>

      {/* Pamper your pop */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-2ff2/k2-_eb4ee9cf-d7e3-4d82-adc2-b00fb7e08d65.v1.jpg?odnHeight=388&odnWidth=385&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">Pamper your pop</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop grooming
        </a>
      </div>

      {/* Up to 60% off */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-9d8f/k2-_895cd593-fd1b-4a35-80e8-38701a209cdf.v1.jpg?odnHeight=776&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">Up to 60% off</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop now
        </a>
      </div>

      {/* For the DIY guy */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-1 row-span-2"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-1f53/k2-_61e92128-afa6-484a-adf9-a34aed140dfc.v1.jpg?odnHeight=1156&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 font-bold text-sm md:text-2xl text-white">For the DIY guy</h2>
        <a href="#" className="text-sm underline hover:text-blue-500 text-white">
          Shop tools
        </a>
      </div>

      {/* Tech he'll click with */}
      <div
        className="p-4 rounded shadow-md cursor-pointer col-span-2 md:col-span-1 row-span-1"
        style={{
          backgroundImage:
            "url(https://i5.walmartimages.com/dfw/4ff9c6c9-9bae/k2-_b68a0353-3899-4d62-a0ec-0d53d135987b.v1.jpg?odnHeight=432&odnWidth=770&odnBg=&odnDynImageQuality=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-white mt-2 font-bold text-sm md:text-2xl">
          Tech he'll click with
        </h2>
        <a href="#" className="text-white text-sm underline hover:text-blue-500">
          Shop now
        </a>
      </div>

      {/* Walmart+ members save big */}
      <div
        className="bg-white p-4 rounded shadow-md cursor-pointer col-span-3 md:col-span-2 row-span-1"
        style={{
          backgroundImage:
            `url(${grid12})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mt-2 text-[#f29221] text-sm md:text-2xl w-[80%]">
          XCARD+ members
          <span className="hidden lg:inline ml-1.5 text-[#f29221]">
            save big with free delivery from stores
          </span>
        </h2>
        <a href="#" className="text-sm underline text-[#f29221] hover:text-blue-500">
          Try it for free
        </a>
      </div>
    </div>
  )
}

export default GridComponent
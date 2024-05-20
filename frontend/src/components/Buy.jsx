import { HiOutlineDatabase, HiOutlineDocument } from 'react-icons/hi';

const Buy = () => {
    return (
        <>
            <h1 className="text-center text-2xl my-10">Buy Dataset</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="ml-20">
                    <img src="https://bityl.co/PCRY" className="rounded-3xl"/>
                </div>
                <div className="bg-custom2 h-screen">
                    <p className="text-2xl p-5 border bg-custom3 text-white">About Dataset</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className=" p-10 text-xl lg:col-span-2">Weather Data for 2023             
                        </div>

                        <div className="text-center py-10 text-xl">4.2 ETH</div>

                    </div>
                    <p className="px-10 text-sm mr-40">This dataset contains weather information for various locations worldwide for the year 2023. It includes temperature, humidity, wind speed, precipitation, and atmospheric pressure data collected hourly. </p>
                    <div className="flex">
                        <span className="flex items-center p-10 mr-8">
                            <HiOutlineDatabase className="w-6 h-6 mr-2" />
                            <p>87 GB</p>
                        </span>
                        <span className="flex items-center">
                            <HiOutlineDocument className="w-6 h-6 mr-2" />
                            <p>CSV</p>
                        </span>
                    </div>

                    <button type="submit" className="mb-5 ml-10 text-white bg-custom3 font-medium rounded-lg text-md px-20 py-2.5">Add to cart</button>


                </div>  
            </div>
        </>
    );
};

export default Buy;

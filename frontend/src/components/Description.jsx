import React from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const Description = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
                <img src={assets.car} alt="Nightbuds" className="mx-auto rounded-xl" />
            </div>
            <div className="md:w-1/2 md:pl-8">

                <h1 className="text-3xl font-bold mb-2 text-custom3">Weather Data for 2023</h1>
                <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                        <span className="text-yellow-500 mr-1">&#9733;</span>
                        <span className="text-yellow-500 mr-1">&#9733;</span>
                        <span className="text-yellow-500 mr-1">&#9733;</span>
                        <span className="text-yellow-500 mr-1">&#9733;</span>
                        <span className="text-yellow-500 mr-1">&#9733;</span>
                    </div>
                    <span className="text-custom4">(264 reviews)</span>
                </div>
                <p className="text-custom4 mb-4 mr-20">
                    This dataset contains weather information for various locations worldwide for the year 2023. It includes temperature, humidity, wind speed, precipitation, and atmospheric pressure data collected hourly.
                </p>
                <div className="p-10 rounded-xl border bg-custom2 mr-20 mt-10">

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-custom4">4.2 ETH</span>
                        <button onClick={()=>{
                            navigate('/payment'); 
                        }} className="bg-custom3 text-white px-4 py-2 rounded-md hover:bg-custom1 transition-colors duration-300">
                            Order Now
                        </button>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-4"/>

                    <h2 className="text-xl font-bold mb-2 text-custom4">Heres what you get!</h2>
                    <ul className="list-disc list-inside mb-4 text-custom4">
                        <li>Pair of award winning Nightbuds</li>
                        <li>Access to the MyKokoon app</li>
                        <li>30-day trial</li>
                    </ul>
                    <h2 className="text-xl font-bold mb-2 text-custom4">Whats included in the box?</h2>
                    <ul className="list-disc list-inside text-custom4">
                        <li>Nightbuds headphone</li>
                        <li>Nightbuds carry case</li>
                        <li>4 pairs of silicone sizing tips</li>
                        <li>USB Type-C charging cable</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Description;

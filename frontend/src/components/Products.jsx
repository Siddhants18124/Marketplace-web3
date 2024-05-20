import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React, { useState } from 'react';
import assets from '../assets/assets';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import React Icons
import { useNavigate } from 'react-router-dom';

function Products() {
    const [hoveredId, setHoveredId] = useState(null); // State to track hovered card id
    const [startIndex, setStartIndex] = useState(0); // State to track the start index of displayed products
    const navigate = useNavigate();
    const productsPerPage = 4; // Number of products per page

    const products = [
        {
            id: 1,
            imageUrl: assets.car,
            title: "Weather Data for 2023",
            price: "0.124 ETH",
        },
        {
            id: 2,
            imageUrl: assets.warrior,
            title: "Weather Data for 2023",
            price: "0.124 ETH"
        },
        {
            id: 3,
            imageUrl: assets.car,
            title: "Weather Data for 2023",
            price: "0.124 ETH"
        },
        {
            id: 4,
            imageUrl: assets.warrior,
            title: "Weather Data for 2023",
            price: "0.124 ETH"
        },
        {
            id: 5,
            imageUrl: "https://bityl.co/PCRY",
            title: "Weather Data for 2023",
            price: "0.124 ETH"
        },
        {
            id: 6,
            imageUrl: assets.warrior,
            title: "Weather Data for 2023",
            price: "0.124 ETH"
        },
    ];

    const nextPage = () => {
        if (startIndex + productsPerPage < products.length) {
            setStartIndex(startIndex + productsPerPage);
        }
    };

    const prevPage = () => {
        if (startIndex - productsPerPage >= 0) {
            setStartIndex(startIndex - productsPerPage);
        }
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto mt-10">
                <div className="flex justify-between items-center my-10">
                    <h1 className="text-2xl font-bold text-custom4 inline-block">Trending Products</h1>
                    <div className="flex">
                        <button onClick={prevPage} className="border border-custom3 bg-custom1 rounded-3xl hover:bg-custom2 text-custom3 font-bold py-2 px-4 rounded">
                            <FaArrowLeft /> {/* Use React Icons for the backward button */}
                        </button>
                        <button onClick={nextPage} className="border border-custom3 bg-custom1 rounded-3xl hover:bg-custom2 text-custom3 font-bold py-2 px-4 rounded ml-2">
                            <FaArrowRight /> {/* Use React Icons for the forward button */}
                        </button>
                    </div>
                </div>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                    {products.slice(startIndex, startIndex + productsPerPage).map(product => (
                        <article
                            key={product.id}
                            className={`border relative overflow-hidden shadow-bottomRight transform transition-transform ${hoveredId === product.id ? 'translate-y-[-10px] shadow-custom4' : ''
                                }`}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                                <img
                                    src={product.imageUrl} // Use product imageUrl
                                    alt=""
                                    className="object-cover sm:h-[450px]"
                                    style={{ height: "350px", width: "350px" }}
                                />
                                <div className="m-4  justify-between text-sm">
                                    <div>
                                        <h3 className="text-custom4 text-xl">
                                            {product.title}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-custom4 text-lg">{product.price}</p>
                                        <button onClick={()=> {navigate(`/description`);}} className="rounded-xl border border-custom3 font-bold flex bg-custom1 text-custom3 px-4 py-2 rounded-md hover:bg-custom2 transition-colors duration-300">
                                            View
                                        </button>
                                    </div>
                                </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Products;

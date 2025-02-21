import { useEffect, useState } from "react";
import productJson from "./products.json";
import { useNavigate } from "react-router-dom";


import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Footer from "./Footer";


function MainComponent() {
    const navigate = useNavigate();
    const [products, setProducts] = useState(productJson);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState([]);
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [cartCount, setCartCount] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let previousData = JSON.parse(localStorage.getItem("Cart Details")) || [];
        setCartCount(previousData.length)
    }, [])

    function searchQuery(inputValue) {
        // console.log(int);
        setInput(inputValue)
        if (inputValue.trim() === "") {
            setSearch([]);
            setOpenDialogBox(false);
            return;
        }
        const filteredProducts = products.filter((res) =>
            res.Name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearch(filteredProducts);
        setOpenDialogBox(true);

    }
    // console.log(input);

    function productViewBtnClicked(prodId) {
        console.log(prodId);
        setLoading(true)
        navigate("/ProductViewComponent", { state: { prodOverView: prodId } });
        setTimeout(() => setLoading(false), 1000);

    };


    function navigateCartPage() {
        setLoading(true);
        navigate("/CartComponent")
        setTimeout(() => setLoading(false), 1000);


    }
    useEffect(() => {
        setLoading(false);
    }, [loading]);


    function addToCart(prodId) {
        let previousData = JSON.parse(localStorage.getItem("Cart Details")) || [];

        const selectedProduct = products.find((prod) => prod.Product_id === prodId);
        if (!selectedProduct) return;

        const existingProductIndex = previousData.findIndex(item => item.Product_id === prodId);

        if (existingProductIndex !== -1) {
            // If product already exists, update quantity
            previousData[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart
            previousData.push({ ...selectedProduct, quantity: 1 });
        }

        localStorage.setItem("Cart Details", JSON.stringify(previousData));
        setCartCount(previousData.length);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loading-spinner">
                    <div></div>
                </div>
            </div>
        )
    }



    return (
        <>
            <section className="fixed w-full grid sm:grid-cols-2  grid-cols-[auto_auto] items-center p-2 py-6 border-b-gray-300 border-b bg-white">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="font-bold text-xl">𝓙𝓽𝓭</h1>
                    </div>
                    <div className="relative flex flex-col w-full bg-white rounded-3xl">
                        <div className="flex justify-between items-center p-2 rounded-3xl shadow-lg w-full">
                            <input
                                value={input}
                                onChange={(e) => searchQuery(e.target.value)}
                                className="outline-none w-full pl-4 z-20"
                                type="text"
                                name=""
                                id=""
                                placeholder="Search ..." />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 text-blue-400 z-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        {openDialogBox && (
                            <ul className="absolute top-6 bg-white w-full p-2 rounded-b-3xl z-10">
                                {search.length > 0 ? (
                                    search.map((prod) => (
                                        <li
                                            key={prod.Product_id}
                                            className="p-2 hover:bg-gray-50 border-b-gray-100 border-b cursor-pointer"
                                            onClick={() => productViewBtnClicked(prod.Product_id)}
                                        >
                                            <div className="flex justify-between">
                                                <h1>{prod.Name}</h1>
                                                <img width="30px" height="20px" src={prod.Image} alt="" />
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <h1 className="p-2 text-gray-500">Not Available...</h1>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="relative flex gap-4 ml-auto cursor-pointer">
                    <div onClick={navigateCartPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <div className="absolute -top-5 left-3 bg-black text-white rounded-full px-2 font-bold">
                            <p>{cartCount}</p>
                        </div>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </section>
            <section className="p-4 pt-28">
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {products.map((prod) => (
                        <li key={prod.Product_id} className="shadow-lg flex flex-col justify-between rounded-lg md:h-90 ">
                            <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 rounded-t-lg ">
                                <img
                                    onClick={() => productViewBtnClicked(prod.Product_id)}
                                    className="w-full h-full object-contain"
                                    src={prod.Image}
                                    alt={prod.Name}
                                />
                            </div>
                            <div onClick={() => productViewBtnClicked(prod.Product_id)} className="px-2">
                                <h1 className="font-bold">₹ {prod.Price}</h1>
                                <h1 className="font-semibold line-clamp-1">{prod.Name}</h1>
                                <p className="line-clamp-1 text-gray-900 text-sm">{prod.Description}</p>
                                <HoverCard>
                                    <HoverCardTrigger className="underline text-sm cursor-pointer">View more</HoverCardTrigger>
                                    <HoverCardContent>
                                        <h1 className="font-bold line-clamp-1">{prod.Name}</h1>
                                        <p className="text-gray-600 text-sm font-bold">{prod.Description}</p>

                                        <div className="flex gap-2 font-bold">
                                            <p className="text-gray-600">Sizes: </p>
                                            <p>{prod.Sizes.join(", ")}</p>
                                        </div>
                                        <div className="flex gap-2 font-bold">
                                            <h1 className="text-green-600">Stock :</h1>
                                            <p className="text-black">{prod.Stock}</p>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <button onClick={() => addToCart(prod.Product_id)} className="flex gap-2 bg-black text-white hover:bg-blue-800 shadow-lg justify-center items-center py-2 font-bold cursor-pointer rounded-b-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <p className="cursor-pointer">Add To Cart</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
            <Footer />
        </>
    )
}

export default MainComponent;
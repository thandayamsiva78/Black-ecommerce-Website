import { useEffect, useState } from "react";

function CartComponent() {
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        function getCartDetailsFromLocalStorage() {
            const data = JSON.parse(localStorage.getItem("Cart Details"));
            setProducts(data || []);
        }
        getCartDetailsFromLocalStorage();
    }, []);

    useEffect(() => {
        const totalAmount = products.reduce((acc, prod) => acc + (prod.Price * (prod.quantity || 1)), 0);
        setAmount(totalAmount);
    }, [products]);

    const removeFromCart = (productId) => {
        const updatedCart = products.filter((prod) => prod.Product_id !== productId);
        setProducts(updatedCart);
        localStorage.setItem("Cart Details", JSON.stringify(updatedCart));
    };

    return (
        <>
            <section className="h-[100vh] bg-slate-50">
                <div className="h-16 bg-white border-b-gray-300 border-b font-bold text-md text-black flex gap-4 items-center px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <h1 className="text-lg md:text-md">YOUR CART</h1>
                </div>
                <section className="yourCart grid grid-cols-1 md:grid-cols-[1fr_400px] p-4 gap-2 shadow-lg h-[95vh]">
                    <aside className="shadow-lg rounded-lg overflow-y-auto bg-white">
                        <ul className="flex flex-col">
                            {products.slice().reverse().map((prod) => (
                                <li key={prod.Product_id} className="flex gap-2 border-b-gray-300 border-b p-2">
                                    <img width="100px" height="100px" src={prod.Image} alt={prod.Name} className="md:w-38 md:h-auto" />
                                    <div>
                                        <h1 className="font-bold">{prod.Name}</h1>
                                        <p className="line-clamp-1 text-gray-700">{prod.Description}</p>
                                        <h1 className="font-bold">₹ {prod.Price}</h1>
                                        <p className="font-bold">Qty: {prod.quantity}</p>
                                        <div className="flex">
                                            <h1 className="font-bold text-green-600">Stock :</h1>
                                            <h1>{prod.Stock}</h1>
                                        </div>
                                        <div className="flex justify-end items-center">
                                        <button onClick={() => removeFromCart(prod.Product_id)} className="bg-red-500 hover:bg-red-600 rounded-md text-white font-bold px-3 py-1 mt-2 shadow-lg cursor-pointer">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <aside className="shadow-lg border-gray-100 border p-2 h-40 rounded-lg flex flex-col justify-between bg-white">
                        <h1 className="font-bold">Cart Details</h1>
                        <div className="flex justify-between items-center">
                            <div className="font-bold">
                                <h1>Total Amount :</h1>
                                <h1>₹ {amount}</h1>
                            </div>
                            <button className="bg-black text-white font-bold p-3 shadow-lg cursor-pointer hover:bg-blue-600">Place Order</button>
                        </div>
                    </aside>
                </section>
            </section>
        </>
    );
}

export default CartComponent;

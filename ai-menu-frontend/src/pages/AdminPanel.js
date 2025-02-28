import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
    const { tableId } = useParams(); // Get tableId from URL
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("https://ai-menu-0xwb.onrender.com/menu/get");
                console.log("Menu API Response:", response.data); // Debugging
                setMenu(response.data.Menu || response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };
    
        fetchMenu();
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-orange-100 to-red-200 min-h-screen flex flex-col items-center">
            <div className="text-center mb-6">
                <img src="/logo.png" alt="Restaurant Logo" className="mx-auto w-40" />
                <h2 className="text-4xl font-bold text-gray-900 drop-shadow-md">Menu for Table {tableId}</h2>
            </div>
            
            <div className="max-w-5xl w-full">
                {menu.length > 0 ? (
                    <>
                        {Object.entries(
                            menu.reduce((acc, item) => {
                                acc[item.category] = [...(acc[item.category] || []), item];
                                return acc;
                            }, {})
                        ).map(([category, items]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3 border-b-2 pb-2 border-red-400">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item) => (
                                        <div key={item._id} className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center">
                                            <img src={item.image || "/public/images/pizza.jpg"} alt={item.name} className="w-24 h-24 object-cover mb-3 rounded-full border border-gray-300" />
                                            <strong className="text-lg text-gray-900">{item.name}</strong>
                                            <span className="text-gray-700 mt-1">₹{item.price}</span>
                                            <button 
                                                onClick={() => addToCart(item)} 
                                                className="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition">
                                                Order
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="text-center text-gray-600">Loading menu...</p>
                )}
            </div>
        </div>
    );
};

export default MenuPage;

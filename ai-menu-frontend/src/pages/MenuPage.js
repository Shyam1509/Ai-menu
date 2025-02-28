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
                console.log("Menu API Response:", response.data);
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
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="text-center mb-6">
                <img src="/logo.png" alt="Restaurant Logo" className="mx-auto w-32" />
                <h2 className="text-4xl font-bold text-gray-900">Menu for Table {tableId}</h2>
            </div>
            
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.length > 0 ? (
                    menu.map((item) => (
                        <div key={item._id} className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center hover:shadow-2xl transition duration-300">
                            <img src={item.image || "/public/images/pizza.jpg"} alt={item.name} className="w-32 h-32 object-cover mb-3 rounded-lg border border-gray-300" />
                            <strong className="text-lg text-gray-900">{item.name}</strong>
                            <span className="text-gray-600 mt-1">₹{item.price}</span>
                            <button 
                                onClick={() => addToCart(item)} 
                                className="mt-3 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
                                Order
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Loading menu...</p>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
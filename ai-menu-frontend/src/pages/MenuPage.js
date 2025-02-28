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
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="text-center mb-6">
                <img src="/logo.png" alt="Restaurant Logo" className="mx-auto w-32" />
                <h2 className="text-3xl font-bold text-gray-800">Menu for Table {tableId}</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
                {menu.length > 0 ? (
                    <>
                        {Object.entries(
                            menu.reduce((acc, item) => {
                                acc[item.category] = [...(acc[item.category] || []), item];
                                return acc;
                            }, {})
                        ).map(([category, items]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">{category}</h3>
                                <ul className="bg-white rounded-lg shadow-md p-4">
                                    {items.map((item) => (
                                        <li key={item._id} className="flex justify-between items-center border-b pb-3 mb-3 last:border-none">
                                            <div>
                                                <strong className="text-gray-800">{item.name}</strong>
                                                <span className="text-gray-600 block">₹{item.price}</span>
                                            </div>
                                            <button onClick={() => addToCart(item)} className="bg-green-500 text-white px-3 py-1 rounded-lg">Order</button>
                                        </li>
                                    ))}
                                </ul>
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

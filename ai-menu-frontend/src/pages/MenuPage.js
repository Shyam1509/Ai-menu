import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
    const { tableId } = useParams(); // Get tableId from URL
    const [menu, setMenu] = useState([]);
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("https://fd6c-2409-4041-6e98-bd86-56f-1107-4834-22f7.ngrok-free.app/menu/get");
                console.log("Menu API Response:", response.data); // Debugging
                setMenu(response.data.Menu || response.data); // Fix response structure
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };
    
        fetchMenu();
    }, []);
    

    return (
        <div>
            <h2>Menu for Table {tableId}</h2>
            <ul>
                {menu.map((item) => (
                    <li key={item._id}>
                        <strong>{item.name}</strong> - ₹{item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuPage;

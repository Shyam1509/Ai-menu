import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
    const { tableId } = useParams(); // Get tableId from URL
    const [menu, setMenu] = useState([]);
    
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("http://localhost:5500/menu/get");
                setMenu(response.data);
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

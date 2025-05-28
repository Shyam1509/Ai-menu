import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FiSearch,
  FiShoppingCart,
  FiTrash,
  FiMinus,
  FiPlus,
  FiX,
  FiFileText,
} from "react-icons/fi";

const MenuPage = () => {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(true); // ✅ Toggle Cart Visibility

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5500/menu/get");
        setMenu(response.data.Menu || response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);
  

  const ordered = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add items before ordering.");
      return;
    }

    try {
      await axios.post("http://localhost:5500/order", { tableId, items: cart });
      alert("Order placed successfully!");
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item._id !== id));

  const updateQuantity = (id, type) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const categories = [
    "All",
    "Pizza",
    "Fast Food",
    "Noodle",
    "Dessert",
    "Sea Food",
    "Sushi",
    "Ramen",
  ];

  const filteredMenu = menu.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed Navigation */}
      <aside className="w-20 bg-white shadow-lg flex flex-col items-center py-5 space-y-6 fixed left-0 top-0 h-full">
        <img
          src="https://res.cloudinary.com/dbkhyv9vc/image/upload/v1740987692/darden-restaurant-logo-png-transparent_bljnc1.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <FiShoppingCart className="text-gray-700 text-2xl cursor-pointer" />
      </aside>

      {/* Main Content */}
      <div className={`flex-grow ml-20 p-6 ${isCartOpen ? "mr-80" : "mr-0"}`}>
        {/* Fixed Header */}
        <div className="bg-white shadow-md py-4 px-6 fixed top-0 left-20 right-0 flex justify-between items-center z-30">
          <h2 className="text-3xl font-bold text-gray-900">Grill Restaurant</h2>
          <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Here"
              className="outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Fixed Category Tabs */}
        <div className="bg-white shadow-md py-3 px-6 fixed top-16 left-20 right-0 flex space-x-3 overflow-x-auto z-40">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div key={item._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={item.image || "/images/default-food.jpg"}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-3">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-green-600 font-semibold text-lg">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Cart Button (Bill Icon) */}
      {!isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed top-16 right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <FiFileText size={24} />
        </button>
      )}

      {/* My Order Sidebar (Starts Below Search Bar) */}
      {isCartOpen && (
        <aside className="w-80 bg-white shadow-lg p-2 pr-6 pl-6 fixed top-16 right-0 h-full overflow-y-auto z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">My Order</h3>
            <button onClick={() => setIsCartOpen(false)}>
              <FiX size={24} className="text-red-600" />
            </button>
          </div>
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image || "/images/default-food.jpg"}
                      alt={item.name}
                      className="w-12 h-12 rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <span className="text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item._id, "decrease")}
                      className="bg-gray-200 p-1 rounded-md"
                    >
                      <FiMinus className="text-red-500" />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, "increase")}
                      className="bg-gray-200 p-1 rounded-md"
                    >
                      <FiPlus className="text-green-500" />
                    </button>
                    <button onClick={() => removeFromCart(item._id)}>
                      <FiTrash className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Total Price Section */}
              <div className="flex justify-between items-center text-lg font-semibold mt-4 border-t pt-3">
                <span>Total:</span>
                <span className="text-green-600">
                  ₹
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <button
                onClick={ordered}
                className="bg-green-500 text-white px-4 py-2 w-full mt-4 rounded-md"
              >
                Checkout
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </aside>
      )}
    </div>
  );
};

export default MenuPage;

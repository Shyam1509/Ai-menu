import { useState, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";

export default function ManageMenu() {
    const [menu, setMenu] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Fetch menu items from API
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const res = await fetch("https://ai-menu-0xwb.onrender.com/menu/get"); // 🔥 Ensure correct API URL
            const data = await res.json();
            setMenu(data);
        } catch (error) {
            console.error("❌ Error fetching menu:", error);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `http://localhost:5500/menu/get${editingId}` : "http://localhost:5500/menu/get";

            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            fetchMenu(); // Refresh menu
            setIsModalOpen(false);
            setForm({ name: "", price: "", description: "" });
            setEditingId(null);
        } catch (error) {
            console.error("❌ Error saving menu item:", error);
        }
    };

    const handleEdit = (item) => {
        setForm({ name: item.name, price: item.price, description: item.description });
        setEditingId(item._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(`http://localhost:5500/menu/get${id}`, { method: "DELETE" });
            fetchMenu(); // Refresh menu
        } catch (error) {
            console.error("❌ Error deleting menu item:", error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🍽 Manage Menu</h2>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                ➕ Add Item
            </button>

            {/* ✅ Simple Table Layout */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item) => (
                            <tr key={item._id} className="border-t">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">₹{item.price}</td>
                                <td className="p-3">{item.description}</td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="p-1 bg-yellow-500 text-white rounded">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="p-1 bg-red-500 text-white rounded">
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Custom Modal for Adding/Editing Menu Items */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">{editingId ? "✏ Edit Item" : "➕ Add Item"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="Item Name"
                                required
                                className="w-full p-2 border rounded"
                            />
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                                type="number"
                                required
                                className="w-full p-2 border rounded"
                            />
                            <input
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    {editingId ? "Save Changes" : "Add Item"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

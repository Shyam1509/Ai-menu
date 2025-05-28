import { FiHome, FiList, FiUsers, FiLogOut, FiBarChart2 } from "react-icons/fi";

const Sidebar = ({ setActiveTab }) => {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col py-6 space-y-6 fixed left-0 top-0 h-full">
      <h2 className="text-2xl font-bold text-center text-gray-700">Admin Panel</h2>
      <nav className="flex flex-col space-y-4 px-4">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
        >
          <FiBarChart2 size={20} />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
        >
          <FiList size={20} />
          <span>Manage Menu</span>
        </button>
        <button
          onClick={() => setActiveTab("Generate-QR")}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
        >
          <FiHome size={20} />
          <span>Generate-QR</span>
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
        >
          <FiUsers size={20} />
          <span>Orders</span>
        </button>
        <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 mt-auto">
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

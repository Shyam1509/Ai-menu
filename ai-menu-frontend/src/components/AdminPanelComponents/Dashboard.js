import { FiTrendingUp, FiTrendingDown, FiHome, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <FiTrendingUp size={30} className="text-green-500" />
          <h3 className="text-lg font-semibold">Total Profit</h3>
          <p className="text-2xl font-bold">₹50,000</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <FiTrendingDown size={30} className="text-red-500" />
          <h3 className="text-lg font-semibold">Total Loss</h3>
          <p className="text-2xl font-bold">₹10,000</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <FiHome size={30} className="text-blue-500" />
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <FiUsers size={30} className="text-purple-500" />
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-2xl font-bold">80</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import Sidebar from "../components/AdminPanelComponents/Sidebar";
import Dashboard from "../components/AdminPanelComponents/Dashboard";
import ManageMenu from "../components/AdminPanelComponents/ManageMenu";
import GenerateQR from "../components/AdminPanelComponents/GenerateQR";
import Orders from "../components/AdminPanelComponents/Orders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-grow ml-64 p-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "menu" && <ManageMenu />}
        {activeTab === "Generate-QR" && <GenerateQR />}
        {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
};

export default AdminDashboard;

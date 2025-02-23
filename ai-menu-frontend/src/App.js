import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel"; // Admin Panel for QR Generation
import MenuPage from "./pages/MenuPage"; // Customer Menu Page
// import OrderPage from "./pages/OrderPage"; // Order Summary Page

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/menu/:tableId" element={<MenuPage />} />
                {/* <Route path="/order/:tableId" element={<OrderPage />} />  */}
            </Routes>
        </Router>
    );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostFood from "./pages/PostFood";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8f5f0]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<PostFood />} />
          <Route path="/my-listings" element={<MyListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

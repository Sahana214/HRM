import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Availability from "./pages/Availability";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/availability">Availability</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
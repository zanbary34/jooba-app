import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Jooba from "./components/Jooba";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jooba" element={<Jooba />} />

      </Routes>
    </Router>
  );
}

export default App;

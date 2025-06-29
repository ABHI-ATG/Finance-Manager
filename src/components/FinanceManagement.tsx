import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CheckStatement from "./CheckStatement";
import AddState from "./AddStatement";
import Home from "./Home";
import GetInsights from "./GetInsights";

const FinanceManagement = () => {
  return (
    <div className="container">
      <h2>Finance Management</h2>
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddState />} />
          <Route path="/check" element={<CheckStatement />} />
          <Route path="/get" element={<GetInsights />} />
        </Routes>
      </div>
    </div>
  );
};

export default FinanceManagement;

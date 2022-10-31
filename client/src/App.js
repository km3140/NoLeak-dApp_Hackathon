import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import Leftbar from "./components/Leftbar";
import { useEffect, useState } from "react";
import Transaction from "./pages/Transaction";
import { MultisigContract } from "./abi/MultisigABI";

function App() {
  return (
    <>
      <Navbar />
      <Leftbar />
      <div style={{ marginLeft: "80px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tran" element={<Transaction />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

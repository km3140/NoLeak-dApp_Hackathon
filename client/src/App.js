import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leftbar from "./components/Leftbar";
import { useEffect, useState } from "react";
import Transaction from "./pages/Transaction";

function App() {
  const [priceObject, setPriceObject] = useState({});

  const tokens = [
    {
      img: "https://cryptologos.cc/logos/klaytn-klay-logo.png",
      id: "klay-token",
      name: "KLAY",
      count: 2000,
    },
    {
      img: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/116_Ethereum_logo_logos-512.png",
      id: "ethereum",
      name: "ETH",
      count: 10,
    },
  ];

  let sum = "";
  tokens.forEach(token => {
    sum += token.id + ",";
  });
  const ids = sum;
  const fetchTokenPrice = async () => {
    const res = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    const fetchRes = await fetch(res);
    const jsonRes = await fetchRes.json();
    console.log(jsonRes);
    setPriceObject(jsonRes);
  };

  useEffect(() => {
    fetchTokenPrice();
  }, []);

  return (
    <>
      <Navbar />
      <Leftbar />
      <div style={{ marginLeft: "80px" }}>
        <Routes>
          <Route
            path="/"
            element={<Dashboard priceObject={priceObject} tokens={tokens} />}
          />
          <Route path="/tran" element={<Transaction />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

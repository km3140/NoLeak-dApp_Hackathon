import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Transaction from './pages/Transaction';
import Menu from './components/Menu';
import { useEffect, useState } from 'react';

function App() {
  const tokens = [
    {
      img: 'https://cryptologos.cc/logos/klaytn-klay-logo.png',
      name: 'klay-token',
      count: 20000,
    },
    {
      img: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      name: 'tether',
      count: 10000,
    },
    {
      img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      name: 'usd',
      count: 30000,
    },
    {
      img: 'https://www.freelogovectors.net/svg12/ethereum_logo_freelogovectors.net.svg',
      name: 'ethereum',
      count: 100,
    },
  ];

  const [priceObject, setPriceObject] = useState({});

  let sum = '';
  tokens.forEach(token => {
    sum += token.name + ',';
  });
  const names = sum;
  const fetchTokenPrice = async () => {
    const res = `https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=usd`;
    const fetchRes = await fetch(res);
    const jsonRes = await fetchRes.json();
    console.log(jsonRes);
    setPriceObject(jsonRes);
  };

  useEffect(() => {
    fetchTokenPrice();
    console.log(priceObject, 'is priceObj');
    console.log(priceObject[tokens[0].name]);
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Menu />
        <div style={{ marginLeft: '80px' }}>
          <Routes>
            <Route
              path="/"
              element={<Main priceObject={priceObject} tokens={tokens} />}
            />
            <Route path="/tran" element={<Transaction />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

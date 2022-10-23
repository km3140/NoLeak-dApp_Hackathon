import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Transaction from './pages/Transaction';
import Menu from './components/Menu';
import AmountList from './pages/AmountList';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Menu />
        <div style={{ marginLeft: '80px' }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/tran" element={<Transaction />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

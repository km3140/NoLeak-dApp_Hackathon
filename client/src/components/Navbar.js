import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import { FaBars } from 'react-icons/fa';
// import { GoX } from 'react-icons/go';
// import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import '../styles/Navbar.css';

function Navbar() {
  const [connection, setConnection] = useState(false);

  const walletConnect = () => setConnection(!connection);
  return (
    <>
      <nav className="navbar">
        <div className="nav_container">
          <Link to="/" className="nav_logo">
            NO LEAK
          </Link>
          <ul className={connection ? 'nav_menu active' : 'nav_menu'}>
            {/*반응형 class?*/}
            <li className="nav_item">
              <Link to="/" className="nav_link">
                대시보드
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/tran" className="nav_link">
                거래내역
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/" className="nav_link">
                구성원관리
              </Link>
            </li>
          </ul>
          <div className="nav_connect" onClick={walletConnect}>
            {connection ? (
              <Button variant="outline-warning">CONNECT</Button>
            ) : (
              <Button id="connect" variant="outline-primary">
                CONNECTED
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

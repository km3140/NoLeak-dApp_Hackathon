import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GoX } from "react-icons/go";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import "../styles/Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav_container">
          <Link to="/" className="nav_logo">
            NO LEAK
          </Link>
          <ul className={click ? "nav_menu active" : "nav_menu"}>
            <li className="nav_item">
              <Link to="/" className="nav_link" onClick={handleClick}>
                HOME
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/" className="nav_link" onClick={handleClick}>
                HOME2
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/" className="nav_link" onClick={handleClick}>
                HOME3
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/" className="nav_link" onClick={handleClick}>
                HOME4
              </Link>
            </li>
          </ul>
          <div className="nav_icon" onClick={handleClick}>
            {click ? <GoX /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

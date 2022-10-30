import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { connect, getAddress } from "../redux/reducers/WalletActions";

function Navbar() {
  const dispatch = useDispatch();
  const walletConnect = () => {
    dispatch(connect());
  };
  const userAccount = useSelector(state => state.account);
  console.log(userAccount);

  let str = userAccount;
  let acc = str.slice(0, 6) + " ..." + str.slice(38, 42).toUpperCase();

  useEffect(() => {
    if (userAccount !== null) {
      dispatch(getAddress());
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav_container">
          <Link to="/" className="nav_logo">
            NO LEAK
          </Link>
          <ul className={userAccount ? "nav_menu active" : "nav_menu"}>
            <li className="nav_item">
              <Link to="/" className="nav_link">
                대시보드
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/" className="nav_link">
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
            {userAccount ? (
              <Button
                variant="outline-warning"
                style={{ whiteSpace: "nowrap" }}
              >
                {acc}
              </Button>
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

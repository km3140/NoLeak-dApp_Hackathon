import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import Transaction from "../pages/Transaction";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
// 1. 거래세목 2. 거래내역(contract) 3. 송신인 4. 수신인 5. 금액
function Main() {
  return (
    <div className="main_container">
      <div className="main_grid">
        <Link to="tran">
          <div className="main_move_btn">
            자세히보기 <FaAngleDoubleRight />
          </div>
        </Link>
        <Transaction />
      </div>
      <div className="main_grid main_detail">
        <span>거래세목</span>
      </div>
      <div className="main_grid main_detail">
        <span>거래세목</span>
      </div>
      <div className="main_grid main_detail">
        <span>금액</span>
      </div>
    </div>
  );
}

export default Main;

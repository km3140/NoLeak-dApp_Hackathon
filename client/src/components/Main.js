import React from "react";
import "../styles/Main.css";

// 1. 거래세목 2. 거래내역(contract) 3. 송신인 4. 수신인 5. 금액
function Main() {
  return (
    <div className="container">
      <div className="item">
        <div className="item_hr">거래내역</div>
        <span>거래내역</span>
      </div>
      <div className="item">
        <span>거래세목</span>
      </div>
      <div className="item">
        <span>거래세목</span>
      </div>
      <div className="item">
        <span>금액</span>
      </div>
    </div>
  );
}

export default Main;

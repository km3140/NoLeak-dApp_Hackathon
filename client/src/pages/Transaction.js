import React, { useEffect, useState } from "react";
import "../styles/Transaction.css";
import AmountList from "../pages/AmountList";

function Transaction() {
  const [moneyList, setMoneyList] = useState([]);

  useEffect(() => {
    const jsonList = async () => {
      const res = `./moneylist.json`;
      const fetchRes = await fetch(res);
      const jsonRes = await fetchRes.json();
      setMoneyList(jsonRes);
      console.log(moneyList);
    };
    jsonList();
  }, []);

  return (
    <div className="main_container">
      <div className="hidden">
        <div className="main_title">거래내역</div>
        <div className="main_group">
          <div className="main_name">이름</div>
          <div className="main_part">부서</div>
          <div className="main_amount">금액</div>
          <div className="main_root">용도</div>
        </div>
        <div>
          {moneyList.map((list, idx) => {
            return (
              <AmountList
                key={idx}
                name={list.name}
                part={list.part}
                amount={list.amount}
                root={list.root}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Transaction;

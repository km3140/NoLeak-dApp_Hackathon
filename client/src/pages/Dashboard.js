import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TokenInfo from "../components/TokenInfo";
import Piechart from "../components/Piechart";
import Transaction from "./Transaction";
import "../styles/Dashboard.css";
import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";

function Dashboard({ tokens, priceObject }) {
  const [depositModalShow, setDepositModalShow] = useState(false);
  const [WithdrawModalShow, setWithdrawModalShow] = useState(false);

  let sum = 0;
  let allBalance;
  tokens.forEach(token => {
    sum += token.count * priceObject[token.id]?.usd;
    allBalance = "$" + sum.toFixed(2);
  });

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_area_lable">금고 현황</div>
        <div className="dashboard_area">
          <div className="tokens_area">
            <div className="tokens_lable">
              <Button
                onClick={() => setDepositModalShow(true)}
                variant="primary"
                size="lg"
                id="deposit_btn"
                style={{ marginLeft: "3.2rem" }}
              >
                입금
              </Button>
              <Button
                onClick={() => setWithdrawModalShow(true)}
                variant="primary"
                size="lg"
                id="deposit_btn"
                style={{ marginLeft: "2.2rem" }}
              >
                출금
              </Button>
              <DepositModal
                show={depositModalShow}
                onHide={() => setDepositModalShow(false)}
              />
              <WithdrawModal
                show={WithdrawModalShow}
                onHide={() => setWithdrawModalShow(false)}
              />
            </div>
            <div className="deposit_tokens">
              <div style={{ borderBottom: "2px black solid" }}>
                <span>보유 잔고</span>
              </div>
              {tokens.map((token, index) => {
                return (
                  <div className="token_column" key={index}>
                    <TokenInfo token={token} />
                  </div>
                );
              })}
              <div style={{ display: "flex" }}>
                <span style={{ flexGrow: "1" }}>환산 금액</span>
                <span style={{ flexGrow: "1" }}>
                  {allBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Piechart tokens={tokens} priceObject={priceObject} />
          </div>
        </div>
      </div>
      <div style={{ height: "31rem", paddingBottom: "3rem" }}>
        <Transaction />
      </div>
    </>
  );
}

export default Dashboard;

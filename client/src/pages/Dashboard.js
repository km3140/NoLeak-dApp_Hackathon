import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TokenInfo from "../components/TokenInfo";
import Piechart from "../components/Piechart";
import Transaction from "./Transaction";
import "../styles/Dashboard.css";
import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";
import { MultisigContract } from "../abi/MultisigABI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [depositModalShow, setDepositModalShow] = useState(false);
  const [WithdrawModalShow, setWithdrawModalShow] = useState(false);
  const [priceObject, setPriceObject] = useState({});
  const [contractBalance, setContractBalance] = useState("");

  useEffect(() => {
    const read = async () => {
      const balance = await MultisigContract.methods
        .getContractBalance()
        .call();
      setContractBalance(balance);
    };
    read();
  }, [contractBalance]);

  let contractBal = (contractBalance / 10 ** 18).toFixed(2);

  const tokens = [
    {
      img: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/116_Ethereum_logo_logos-512.png",
      id: "ethereum",
      name: "ETH",
      count: contractBal,
    },
    {
      img: "https://cryptologos.cc/logos/klaytn-klay-logo.png",
      id: "klay-token",
      name: "KLAY",
      count: 100,
    },
  ];

  let sums = "";
  tokens.forEach(token => {
    sums += token.id + ",";
  });
  const ids = sums;
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

  let sum = 0;
  let allBalance;
  tokens.forEach(token => {
    sum += token.count * priceObject[token.id]?.usd;
    allBalance = "$" + sum.toFixed(2);
  });

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_area_lable">
          금고 현황{" "}
          <FontAwesomeIcon
            icon={faLock}
            size="1x"
            style={{ color: "#ffdd40" }}
          />
        </div>
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
              <div
                style={{ borderBottom: "2px black solid", fontSize: "1.2rem" }}
              >
                <span>보유 잔고</span>
              </div>
              {tokens.map((token, index) => {
                return (
                  <div className="token_column" key={index}>
                    <TokenInfo token={token} />
                  </div>
                );
              })}
              <div style={{ display: "flex", fontSize: "1.2rem" }}>
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

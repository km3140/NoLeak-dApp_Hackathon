import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button, ProgressBar } from "react-bootstrap";
import "../styles/Transaction.css";
import AddTransModal from "../components/AddTransModal";
import { MultisigContract } from "../abi/MultisigABI";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

const Transaction = () => {
  const [transactionRead, setTransactionRead] = useState([]);
  const [location, setLocation] = useState("");
  const userAccount = useSelector(state => state.account);

  const getLocation = () => {
    setLocation(window.location.pathname);
  };

  const transactionApproval = async () => {
    await MultisigContract.methods
      .approveTransferRequest(transactionRead.length - 1)
      .send({ from: userAccount });
  };

  const transactionCancel = async () => {
    await MultisigContract.methods
      .cancelTransferRequest(transactionRead.length - 1)
      .send({ from: userAccount });
  };

  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const read = async () => {
      const tran = await MultisigContract.methods.getTransferRequests().call();
      setTransactionRead(tran);
    };
    read();
  }, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="transaction_container" style={{ marginBottom: "25px" }}>
      <div className="transaction_area_lable">
        승인대기 거래{" "}
        <FontAwesomeIcon
          icon={faMoneyCheckDollar}
          size="1x"
          style={{ paddingTop: "10px", color: "#ffdd40" }}
        />
      </div>
      <div className="transaction_area">
        <div>
          <Button
            variant="primary"
            size="lg"
            id="deposit_btn"
            onClick={() => setModalShow(true)}
            style={{ margin: "0.8rem" }}
          >
            거래 추가
          </Button>
          <AddTransModal show={modalShow} onHide={() => setModalShow(false)} />
          {location === process.env.PUBLIC_URL ? (
            <Link to="/tran" style={{ textDecoration: "none" }}>
              <div className="main_move_btn">
                자세히보기 <FaAngleDoubleRight />
              </div>
            </Link>
          ) : (
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="main_move_btn">
                메인으로 <FaAngleDoubleRight />
              </div>
            </Link>
          )}
        </div>
        {transactionRead.map((read, idx) => {
          return (
            <div className="transaction" key={idx}>
              <div className="transaction_inner">
                <div className="transaction_info">
                  <div>금액: {(read.amount / 10 ** 18).toFixed(3)} ETH</div>
                  <div>승인된 수: {read.approvals}/3</div>
                  <div>받는사람 주소: {read.receiver}</div>
                  <div>보내는사람 주소: {read.sender}</div>
                </div>
                <div className="btns">
                  <div onClick={transactionApproval}>승인</div>
                  <div onClick={transactionCancel}>취소</div>
                </div>
              </div>
              <ProgressBar
                id="progress"
                now={read.approvals * 33}
                label={`${read.approvals * 33}%`}
                variant="warning"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transaction;

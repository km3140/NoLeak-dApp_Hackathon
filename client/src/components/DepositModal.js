import { ethers } from "ethers";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { MultisigContract } from "../abi/MultisigABI";
import useInput from "../abi/UseInput";
import "../styles/Modals.css";

function DepositModal(props) {
  const [amount, onChangeAmount] = useInput("");

  const userAccount = useSelector(state => state.account);

  const depositAmount = async () => {
    const deposit = await MultisigContract.methods
      .deposit()
      .send({ from: userAccount, value: ethers.utils.parseEther(amount) });
    console.log(deposit);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      id="modal"
    >
      <Modal.Header closeButton className="deposit_modal">
        <Modal.Title id="contained-modal-title-vcenter">자산 입금</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="deposit_modal" style={{ padding: "1rem 2rem" }}>
          <div className="modal_contents">
            <div>
              <div>메모</div>
              <div>토큰 선택</div>
              <div>수량</div>
            </div>
            <div>
              <Form.Control
                size="sm"
                type="text"
                placeholder="ex) 3회 KDT해커톤 상금 입금"
              />
              <Form.Select style={{ width: "6rem" }} size="sm">
                <option>KLAY</option>
                <option>ETH</option>
              </Form.Select>
              <Form.Control
                style={{ width: "6rem" }}
                size="sm"
                placeholder="개수"
                onChange={onChangeAmount}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="deposit_modal">
          <Button className="modal_btn" onClick={depositAmount}>
            보내기
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default DepositModal;

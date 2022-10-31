import { ethers } from "ethers";
import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { MultisigContract } from "../abi/MultisigABI";
import useInput from "../abi/UseInput";
import "../styles/Modals.css";

function WithdrawModal(props) {
  const [amount, onChangeAmount] = useInput("");

  const userAccount = useSelector(state => state.account);

  const withdrawAmount = async () => {
    await MultisigContract.methods
      .withdraw(ethers.utils.parseEther(amount))
      .send({ from: userAccount });
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        id="modal"
      >
        <Modal.Header closeButton className="deposit_modal">
          <Modal.Title id="contained-modal-title-vcenter">
            자산 출금
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body
            className="deposit_modal"
            style={{ padding: "1rem 2rem" }}
          >
            <div className="modal_contents">
              <div>
                <div>토큰 선택</div>
                <div>수량</div>
              </div>
              <div>
                <Form.Select style={{ width: "6rem" }} size="sm">
                  <option>ETH</option>
                  <option>KLAY</option>
                </Form.Select>
                <Form.Control
                  style={{ width: "6rem" }}
                  size="sm"
                  placeholder="개수"
                  className="modal_input"
                  onChange={onChangeAmount}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="deposit_modal">
            <Button className="modal_btn" onClick={withdrawAmount}>
              출금 하기
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default WithdrawModal;

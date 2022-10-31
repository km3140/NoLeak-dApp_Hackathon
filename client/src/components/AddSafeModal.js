import React, { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Modals.css";
import { MultisigContract } from "../abi/MultisigABI";
import { useSelector } from "react-redux";
import useInput from "../abi/UseInput";

function AddSafeModal(props) {
  const [user, onChangeUser] = useInput("");
  const userAccount = useSelector(state => state.account);

  const addUser = async () => {
    await MultisigContract.methods
      .addWalletOwner(user)
      .send({ from: userAccount });
  };

  useEffect(() => {
    const read = async () => {
      await MultisigContract.methods.getWalletOners().call();
    };
    read();
  }, []);

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
            금고 사용자 추가
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body
            className="deposit_modal"
            style={{ padding: "1rem 2rem" }}
          >
            <div style={{ display: "flex" }}>
              <Form.Label style={{ marginTop: "0.2rem" }} htmlFor="basic-url">
                사용자 추가
              </Form.Label>
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="지갑 주소"
                style={{ width: "12rem" }}
                aria-label="address"
                className="modal_input"
                onChange={onChangeUser}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className="deposit_modal">
            <Button className="modal_btn" onClick={addUser}>
              사용자 추가
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddSafeModal;

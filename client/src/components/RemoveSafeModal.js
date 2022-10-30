import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Modals.css";
import { MultisigContract } from "../abi/MultisigABI";
import { useSelector } from "react-redux";
import useInput from "../abi/UseInput";

function AddSafeModal(props) {
  const [modalShow, setModalShow] = useState(true);
  const [user, onChangeUser] = useInput("");
  const userAccount = useSelector(state => state.account);

  const removeUser = async () => {
    await MultisigContract.methods
      .removeWalletOwner(user)
      .send({ from: userAccount });
  };

  useEffect(() => {
    setModalShow(true);
  }, [modalShow]);

  return (
    <>
      {modalShow ? (
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          id="modal"
        >
          <Modal.Header closeButton className="deposit_modal">
            <Modal.Title id="contained-modal-title-vcenter">
              금고 사용자 제거
            </Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body
              className="deposit_modal"
              style={{ padding: "1rem 2rem" }}
            >
              <div style={{ display: "flex" }}>
                <Form.Label style={{ marginTop: "0.2rem" }} htmlFor="basic-url">
                  금고 소유주 제거
                </Form.Label>
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="지갑 주소"
                  style={{ width: "12rem" }}
                  aria-label="address"
                  onChange={onChangeUser}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer className="deposit_modal">
              <Button className="modal_btn" onClick={removeUser}>
                사용자 제거
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default AddSafeModal;

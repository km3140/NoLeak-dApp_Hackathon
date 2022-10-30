import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Modals.css";
import { MultisigContract } from "../abi/MultisigABI";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../abi/UseInput";
import { addUserName } from "../redux/reducers/WalletActions";

function AddSafeModal(props) {
  const [modalShow, setModalShow] = useState(true);
  const [user, onChangeUser] = useInput("");
  const dispatch = useDispatch();
  const userAccount = useSelector(state => state.account);

  const addUser = async () => {
    await MultisigContract.methods
      .addWalletOwner(user)
      .send({ from: userAccount });
    setModalShow(false);
  };

  useEffect(() => {
    setModalShow(true);
  }, [modalShow]);

  const addUsers = event => {
    dispatch(addUserName(event));
  };

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
              금고 사용자 추가
            </Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body
              className="deposit_modal"
              style={{ padding: "1rem 2rem" }}
            >
              <Form.Label htmlFor="basic-url">사용자 이름</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="홍길동"
                  aria-label="name"
                  onChange={addUsers}
                />
              </InputGroup>
              <div style={{ display: "flex" }}>
                <Form.Label style={{ marginTop: "0.2rem" }} htmlFor="basic-url">
                  금고 소유주 추가
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
              <Button className="modal_btn" onClick={addUser}>
                사용자 추가
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default AddSafeModal;

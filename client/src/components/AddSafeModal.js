import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/Modals.css";
import { MultisigContract } from "../abi/MultisigABI";
import { useSelector } from "react-redux";

function AddSafeModal(props) {
  const [user, setUser] = useState("");

  const onChangeUser = e => {
    setUser(e.target.value);
    console.log(user);
  };
  const userAccount = useSelector(state => state.account);

  const addUser = async () => {
    const add = await MultisigContract.methods
      .addWalletOwner(user)
      .send({ from: userAccount });
    console.log(add);

    const userNum = await MultisigContract.methods.getWalletOners().call();

    console.log(userNum);
  };
  //입력칸 추가, 제거
  const [countList, setCountList] = useState([0]);
  const addInput = () => {
    const copiedArr = [...countList];
    let index = copiedArr.slice(-1)[0];
    index++;
    copiedArr.push(index);
    setCountList(copiedArr);
  };
  const removeInput = () => {
    if (countList.length <= 1) return;
    const copiedArr = [...countList];
    copiedArr.pop();
    setCountList(copiedArr);
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
        <Modal.Title id="contained-modal-title-vcenter">
          새로운 금고 만들기
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="deposit_modal" style={{ padding: "1rem 2rem" }}>
          <Form.Label htmlFor="basic-url">금고 이름 설정</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="ex) No leak의 모임 통장"
              aria-label="name"
            />
          </InputGroup>
          <div style={{ display: "flex" }}>
            <Form.Label style={{ marginTop: "0.2rem" }} htmlFor="basic-url">
              금고 소유주 추가
            </Form.Label>
            <div className="modal_btn owner_manage_btn" onClick={addInput}>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <div
              style={{ marginLeft: "0.4rem" }}
              className="modal_btn owner_manage_btn"
              onClick={removeInput}
            >
              <FontAwesomeIcon icon={faUserMinus} />
            </div>
          </div>
          {countList.map(index => {
            return (
              <InputGroup className="mb-3" key={index}>
                <Form.Control placeholder="이름" aria-label="name" />
                <Form.Control
                  placeholder="지갑 주소"
                  style={{ width: "12rem" }}
                  aria-label="address"
                  onChange={onChangeUser}
                />
              </InputGroup>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="deposit_modal">
          <Button className="modal_btn" onClick={addUser}>
            금고 생성
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddSafeModal;

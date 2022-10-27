import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Modals.css';

function DepositModal(props) {
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
        <Modal.Body className="deposit_modal" style={{ padding: '1rem 2rem' }}>
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
              <Form.Select style={{ width: '6rem' }} size="sm">
                <option>KLAY</option>
                <option>USDC</option>
                <option>USDT</option>
                <option>ETH</option>
              </Form.Select>
              <Form.Control
                style={{ width: '6rem' }}
                size="sm"
                type="text"
                placeholder="개수"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="deposit_modal">
          <Button className="modal_btn" type="submit" onClick={props.onHide}>
            보내기
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default DepositModal;

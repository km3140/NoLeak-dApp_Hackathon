import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Transaction.css';
import AddTransModal from '../components/AddTransModal';

const Transaction = () => {
  // 트렌젝션 정보
  const tarnsInfo = [
    {
      name: '강사님 월급1',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
    {
      name: '강사님 월급2',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 25,
    },
    {
      name: '강사님 월급3',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 75,
    },
    {
      name: '강사님 월급4',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 25,
    },
    {
      name: '강사님 월급5',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
    {
      name: '강사님 월급6',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
    {
      name: '강사님 월급7',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
    {
      name: '강사님 월급8',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
    {
      name: '강사님 월급9',
      receiver: '박민서',
      amount: '$5',
      agreeRate: 50,
    },
  ];

  // (자세히보기, 메인으로) 토글기능
  const [location, setLocation] = useState('');
  const getLocation = () => {
    setLocation(window.location.pathname);
  };
  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
    console.log(process.env.PUBLIC_URL);
  });

  //모달창 토글
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="transaction_container" style={{ marginBottom: '25px' }}>
      <div className="transaction_area_lable">승인대기 거래</div>
      <div className="transaction_area">
        <div>
          <Button
            variant="primary"
            size="sm"
            id="deposit_btn"
            onClick={() => setModalShow(true)}
          >
            {/* 이 아이디값 말고는 효과가 안먹음;; */}
            거래 추가
          </Button>
          <AddTransModal show={modalShow} onHide={() => setModalShow(false)} />
          {location === process.env.PUBLIC_URL ? (
            <Link to="/tran" style={{ textDecoration: 'none' }}>
              <div className="main_move_btn">
                자세히보기 <FaAngleDoubleRight />
              </div>
            </Link>
          ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="main_move_btn">
                메인으로 <FaAngleDoubleRight />
              </div>
            </Link>
          )}
        </div>
        {/* dummy data */}
        {tarnsInfo.map((cur, index) => {
          return (
            <div className="transaction" key={index}>
              <div className="transaction_inner">
                <div className="transaction_info">
                  <div>거래명: {cur.name}</div>
                  <div>받는사람: {cur.receiver}</div>
                  <div>금액: {cur.amount}</div>
                </div>
                <div className="btns">
                  <div>승인</div>
                  <div>취소</div>
                </div>
              </div>
              <ProgressBar
                id="progress"
                now={cur.agreeRate}
                label={`${cur.agreeRate}%`}
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

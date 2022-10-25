import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Button, ProgressBar } from 'react-bootstrap';

import '../styles/Transaction.css';

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
  ];
  //
  // (자세히보기, 메인으로) 토글기능
  const [location, setLocation] = useState('');
  const getLocation = () => {
    setLocation(window.location.pathname);
  };
  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
  });
  //
  return (
    <div className="transaction_container" style={{ marginBottom: '25px' }}>
      <div className="transaction_area_lable">승인대기 거래</div>
      <div className="transaction_area">
        {location === '/' ? (
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
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
        <div className="transaction">gfdsgsfd</div>
      </div>
    </div>
  );
};

export default Transaction;

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TokenInfo from '../components/TokenInfo';
import Piecharts from '../components/Piechart';
import Transaction from './Transaction';

import '../styles/Dashboard.css';
// 1. 대시보드- 예치토큰 2. 승인대기거래 - 트렌젝션들
function Dashboard({ tokens, priceObject }) {
  let sum = 0;
  let allBalance;
  tokens.forEach((token) => {
    sum += token.count * priceObject[token.id]?.usd;
    allBalance = '$' + sum.toFixed(2);
  });
  return (
    <div>
      <div className="dashboard_container">
        <div className="dashboard_area_lable">대시보드</div>
        <div className="dashboard_area">
          <div className="tokens_area">
            <div className="tokens_lable">
              <span>예치 토큰</span>
              <Button variant="primary" size="sm" id="deposit_btn">
                Deposit
              </Button>
            </div>
            <div className="deposit_tokens">
              <div style={{ borderBottom: '2px black solid' }}>
                <span>토큰</span>
                <span>잔액</span>
              </div>
              {tokens.map((token, index) => {
                return (
                  <div className="token_column" key={index}>
                    <TokenInfo token={token} />
                  </div>
                );
              })}
              <div style={{ display: 'flex' }}>
                <span style={{ flexGrow: '1' }}>총 잔액</span>
                <span style={{ flexGrow: '1' }}>
                  {allBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
              </div>
            </div>
            {/*FFFEFE 0.5*/}
          </div>
          <div className="chart">
            <Piecharts tokens={tokens} priceObject={priceObject} />
          </div>
        </div>
      </div>
      <div style={{ height: '31rem', paddingBottom: '3rem' }}>
        <Transaction />
      </div>
    </div>
  );
}

export default Dashboard;

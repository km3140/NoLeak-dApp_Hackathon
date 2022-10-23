import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TokenInfo from './TokenInfo';
import { PieChart } from 'react-minimal-pie-chart';

import '../styles/Main.css';
// 1. 대시보드- 예치토큰 2. 승인대기거래 - 트렌젝션들
function Main() {
  const tokens = [
    {
      img: 'https://cryptologos.cc/logos/klaytn-klay-logo.png',
      name: 'KLAY',
      balance: 20000,
    },
    {
      img: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      name: 'USDT',
      balance: 10000,
    },
    {
      img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      name: 'USDC',
      balance: 30000,
    },
    {
      img: 'https://www.freelogovectors.net/svg12/ethereum_logo_freelogovectors.net.svg',
      name: 'ETH',
      balance: 100,
    },
  ];
  // let sum = 0;
  // tokens.forEach(token => {
  //   sum += token.balance;
  // });
  // let allBalance = sum;
  let allBalance = '$20,432';
  return (
    <div className="main_container">
      <div className="dashboard_lable">대시보드</div>
      <div className="dashboard">
        <div className="tokens_area">
          <div className="tokens_lable">
            <span style={{ color: 'black' }}>예치 토큰</span>
            <Button variant="primary" size="sm" id="deposit_btn">
              Deposit
            </Button>
          </div>
          <div className="deposit_tokens">
            <div style={{ borderBottom: '2px black solid' }}>
              <span>토큰</span>
              <span>잔액</span>
            </div>
            {tokens.map(token => {
              return (
                <div className="token_column">
                  <TokenInfo token={token} />
                </div>
              );
            })}
            <div style={{ display: 'flex' }}>
              <span style={{ flexGrow: '1' }}>총 잔액</span>
              <span style={{ flexGrow: '1' }}>{allBalance}</span>
            </div>
          </div>
          {/*FFFEFE 0.5*/}
        </div>
        <div className="chart">
          <PieChart
            data={[
              { title: tokens[0].name, value: tokens[0].balance, color: '#E38627' },
              { title: tokens[1].name, value: tokens[1].balance, color: '#C13C37' },
              { title: tokens[2].name, value: tokens[2].balance, color: '#6A2135' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;

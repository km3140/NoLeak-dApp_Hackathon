import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TokenInfo from './TokenInfo';
import Piecharts from './Piechart';

import '../styles/Main.css';
import { json } from 'react-router-dom';
// 1. 대시보드- 예치토큰 2. 승인대기거래 - 트렌젝션들
function Main() {
  const tokens = [
    {
      img: 'https://cryptologos.cc/logos/klaytn-klay-logo.png',
      name: 'KLAY',
      count: 20000,
    },
    {
      img: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      name: 'Tether',
      count: 10000,
    },
    {
      img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      name: 'USD',
      count: 30000,
    },
    {
      img: 'https://www.freelogovectors.net/svg12/ethereum_logo_freelogovectors.net.svg',
      name: 'Ethereum',
      count: 100,
    },
  ];

  const [priceObject, setPriceObject] = useState({});

  useEffect(() => {
    let sum = '';
    tokens.forEach((token) => {
      sum += token.name + ',';
    });
    const names = sum;

    const fetchTokenPrice = async () => {
      const res = `https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=krw`;
      const fetchRes = await fetch(res);
      const jsonRes = await fetchRes.json();
      setPriceObject(jsonRes);
      console.log(priceObject, 'is priceObj');
    };
  }, []);

  // let sum = 0;
  // tokens.forEach(token => {
  //   sum += token.count;
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
            {tokens.map((token) => {
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
          <Piecharts tokens={tokens} />
        </div>
      </div>
    </div>
  );
}

export default Main;

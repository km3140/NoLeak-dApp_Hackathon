import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TokenInfo from '../components/TokenInfo';
import Piechart from '../components/Piechart';
import Transaction from './Transaction';
import '../styles/Dashboard.css';
import DepositModal from '../components/DepositModal';

function Dashboard({ tokens, priceObject }) {
  //총합계$ 표시
  let sum = 0;
  let allBalance;
  tokens.forEach(token => {
    sum += token.count * priceObject[token.id]?.usd;
    allBalance = '$' + sum.toFixed(2);
  });
  //모달창 토글
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_area_lable">대시보드</div>
        <div className="dashboard_area">
          <div className="tokens_area">
            <div className="tokens_lable">
              <span>예치 토큰</span>
              <Button
                onClick={() => setModalShow(true)}
                variant="primary"
                size="sm"
                id="deposit_btn"
              >
                Deposit
              </Button>
              <DepositModal show={modalShow} onHide={() => setModalShow(false)} />
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
          </div>
          <div>
            <Piechart tokens={tokens} priceObject={priceObject} />
          </div>
        </div>
      </div>
      <div style={{ height: '31rem', paddingBottom: '3rem' }}>
        <Transaction />
      </div>
    </>
  );
}

export default Dashboard;

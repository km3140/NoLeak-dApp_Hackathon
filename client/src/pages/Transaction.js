import React from 'react';
import '../styles/Transaction.css';

const Transaction = () => {
  return (
    <div className="container" style={{ marginBottom: '25px' }}>
      <div className="board_lable">승인대기 거래</div>
      <div className="board"></div>
    </div>
  );
};

export default Transaction;

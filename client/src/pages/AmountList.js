//그냥 남겨두었습니다
import React from 'react';
import '../styles/AmountList.css';

function AmountList({ name, part, amount, root }) {
  let tvlString = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="pool_list_wrap">
      <div className="pool_list_list">
        <div className="pool_list_pair_name">{name}</div>
        <div className="pool_list_title_name">{part}</div>
        <div className="pool_list_tvl">{tvlString}</div>
        <div className="pool_list_apr">{root}</div>
      </div>
    </div>
  );
}

export default AmountList;

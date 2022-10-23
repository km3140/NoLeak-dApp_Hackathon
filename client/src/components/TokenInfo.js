import React from 'react';

const TokenInfo = ({ token }) => {
  //토큰량이랑,총합에 유효성검사??인가 그거만들어야함
  return (
    <>
      <img
        style={{
          width: '20px',
          height: '23px',
          marginTop: '9px',
          display: 'inline-block',
        }}
        src={token?.img}
      />
      <span style={{ flexGrow: '1' }}>{token?.name}</span>
      <span style={{ flexGrow: '1' }}>
        {token?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </span>
    </>
  );
};

export default TokenInfo;

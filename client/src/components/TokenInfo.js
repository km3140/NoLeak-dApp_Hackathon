import React from "react";

const TokenInfo = ({ token }) => {
  return (
    <>
      <img
        alt=""
        style={{
          width: "20px",
          height: "23px",
          marginTop: "9px",
          display: "inline-block",
        }}
        src={token?.img}
      />
      <span style={{ marginRight: "auto", paddingLeft: "15px" }}>
        {token?.name}
      </span>
      <span style={{ marginLeft: "auto", paddingRight: "30px" }}>
        {token?.count.toString()}
      </span>
    </>
  );
};

export default TokenInfo;

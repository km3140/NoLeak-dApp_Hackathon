import React, { useEffect, useState } from "react";
import { MultisigContract } from "../abi/MultisigABI";
import Jazzicon from "react-jazzicon";
import "../styles/UserPage.css";

function UserPage() {
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    const read = async () => {
      const userNum = await MultisigContract.methods.getWalletOners().call();
      setUserArr(userNum);
    };
    read();
  }, []);

  return (
    <div className="user_container">
      <div className="user_area_lable">구성원관리</div>
      <div className="user_area">UserPage</div>
      <div>
        {userArr.map((arr, idx) => {
          return (
            <div key={idx}>
              <Jazzicon diameter={40} seed={idx} />
              <div>{arr.slice(0, 6)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserPage;

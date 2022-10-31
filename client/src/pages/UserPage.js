import React, { useEffect, useState } from "react";
import { MultisigContract } from "../abi/MultisigABI";
import Jazzicon from "react-jazzicon";
import "../styles/UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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
      <div className="user_area_lable">
        구성원관리{" "}
        <FontAwesomeIcon
          icon={faUser}
          size="1x"
          style={{ paddingTop: "10px", color: "#ffdd40" }}
        />
      </div>
      <div className="user_area">
        <ul className="user_circle">
          <li className="user_text"></li>
          <li className="user_text"></li>
          <li className="user_text"></li>
          <li className="user_text">등록된 사용자 지갑주소</li>
        </ul>
        <div className="user_icon">
          <span className="user_icon_hover" style={{ marginRight: "2rem" }}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </span>
          <span className="user_icon_hover">
            <FontAwesomeIcon icon={faGear} size="2x" />
          </span>
        </div>
        <div>
          {userArr.map((arr, idx) => {
            return (
              <div key={idx} className="user_list_container">
                <Jazzicon diameter={40} seed={idx} />
                <div className="user_list">{arr}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserPage;

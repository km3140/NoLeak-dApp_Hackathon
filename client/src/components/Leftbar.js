import React, { useEffect, useState } from "react";
import "../styles/Leftbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import AddSafeModal from "./AddSafeModal";
import RemoveSafeModal from "./RemoveSafeModal";
import Jazzicon from "react-jazzicon";
import { MultisigContract } from "../abi/MultisigABI";
import { useDispatch, useSelector } from "react-redux";

const Leftbar = () => {
  const [userArr, setUserArr] = useState([]);
  const [addUserModalShow, setAddUserModalShow] = useState(false);
  const [removeUserModalShow, setRemoveUserModalShow] = useState(false);

  const userName = useSelector(state => state.name);

  useEffect(() => {
    const read = async () => {
      const userNum = await MultisigContract.methods.getWalletOners().call();
      setUserArr(userNum, userName);
    };
    read();
  }, []);

  return (
    <ul className="left-bar">
      {userArr.map((arr, idx) => {
        return (
          <li key={idx}>
            <Jazzicon diameter={40} seed={idx} />
            <div>{arr.slice(0, 6)}</div>
          </li>
        );
      })}

      <li onClick={() => setAddUserModalShow(true)}>
        <span style={{ color: "#737373" }}>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </span>
        <div style={{ lineHeight: "20px" }}>
          사용자
          <br />
          추가
        </div>
      </li>
      <AddSafeModal
        show={addUserModalShow}
        onHide={() => setAddUserModalShow(false)}
      />
      <li onClick={() => setRemoveUserModalShow(true)}>
        <span style={{ color: "#737373" }}>
          <FontAwesomeIcon icon={faGear} size="2x" />
        </span>
        <div style={{ lineHeight: "20px" }}>
          사용자
          <br />
          관리
        </div>
      </li>
      <RemoveSafeModal
        show={removeUserModalShow}
        onHide={() => setRemoveUserModalShow(false)}
      />
    </ul>
  );
};

export default Leftbar;

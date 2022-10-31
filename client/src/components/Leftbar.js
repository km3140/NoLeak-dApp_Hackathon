import React, { useEffect, useState } from "react";
import "../styles/Leftbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import AddSafeModal from "./AddSafeModal";
import RemoveSafeModal from "./RemoveSafeModal";
import Jazzicon from "react-jazzicon";
import { MultisigContract } from "../abi/MultisigABI";

const Leftbar = () => {
  const [userArr, setUserArr] = useState([]);
  const [addUserModalShow, setAddUserModalShow] = useState(false);
  const [removeUserModalShow, setRemoveUserModalShow] = useState(false);

  useEffect(() => {
    const read = async () => {
      const userNum = await MultisigContract.methods.getWalletOners().call();
      setUserArr(userNum);
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
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </span>
      </li>
      <AddSafeModal
        show={addUserModalShow}
        onHide={() => setAddUserModalShow(false)}
      />
      <li onClick={() => setRemoveUserModalShow(true)}>
        <span style={{ color: "#737373" }}>
          <FontAwesomeIcon icon={faGear} size="2x" />
        </span>
      </li>
      <RemoveSafeModal
        show={removeUserModalShow}
        onHide={() => setRemoveUserModalShow(false)}
      />
    </ul>
  );
};

export default Leftbar;

import React, { useState } from "react";
import "../styles/Leftbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AddSafeModal from "./AddSafeModal";

const Menu = ({ Account }) => {
  //모달창 토글
  const [modalShow, setModalShow] = useState(false);
  return (
    <ul className="left-bar">
      <li>
        <FontAwesomeIcon icon={faLock} size="2x" />
        <div>금고1</div>
      </li>
      <li onClick={() => setModalShow(true)}>
        <span style={{ color: "#737373" }}>
          <FontAwesomeIcon icon={faLock} size="2x" />
        </span>
        <div style={{ lineHeight: "20px" }}>
          금고
          <br />
          추가
        </div>
      </li>
      <AddSafeModal
        Account={Account}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ul>
  );
};

export default Menu;

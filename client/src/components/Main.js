import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import Transaction from '../pages/Transaction';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
// 1. 대시보드- 예치토큰 2. 승인대기거래 - 트렌젝션들
function Main() {
  return (
    <div className="main_container">
      <div>대시보드</div>
      <div className="main_grid"></div>
    </div>
  );
}

export default Main;
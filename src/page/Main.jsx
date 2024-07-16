import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Random Debate</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => navigate('/Secondpage')}>
          토론방 만들기
        </button>
        <button onClick={() => navigate('/Thirdpage')}>
          토론방 참여
        </button>
      </div>
    </>
  )
}

export default Main;
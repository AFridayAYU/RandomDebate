import React, { useContext } from 'react';
import { AppContext } from '../App';

function Main() {
  const {setPage} = useContext(AppContext);

  return (
    <>
      <h1>Random Debate</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => setPage("create")}>
          토론방 만들기
        </button>
        <button onClick={() => setPage("join")}>
          토론방 참여
        </button>
      </div>
    </>
  )
}

export default Main;
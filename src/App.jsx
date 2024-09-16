import './App.css'
import { createContext, useEffect, useState } from 'react';

import Main from './page/Main';
import CreateRoom from './page/CreateRoom';
import JoinRoom from'./page/JoinRoom';
import GameReady from './page/GameReady';
import Game from './page/Game';
import Result from './page/Result';

export const AppContext = createContext();

function preventGoBack() {
  history.push(null, '', history.location.href);
}

function preventClose(e) {
  e.preventDefault();
  e.returnValue = '';
}

export default function App() {
  const PROG_LIST = ["입론", "반론", "최종 변론"];

  const [page, setPage] = useState("");
  const [team, setTeam] = useState("");
  const [topic, setTopic] = useState("");
  const [chat, setChat] = useState([]);
  const [channel, setChannel] = useState();
  const [code, setCode] = useState(Math.random().toString(36).substring(2,8));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.addEventListener('popstate', preventGoBack);
    window.addEventListener('beforeunload', preventClose);
  }, []);

  return (
    <AppContext.Provider value={{page, setPage, team, setTeam, topic, setTopic, chat, setChat, channel, setChannel, code, setCode, progress, setProgress}}>
      {
        page === "create" ? <CreateRoom /> :
        page === "join" ? <JoinRoom /> :
        page === "ready" ? <GameReady progList={PROG_LIST} /> :
        page === "game"? <Game progList={PROG_LIST} /> :
        page === "result" ? <Result /> :
        <Main />
      }
    </AppContext.Provider>
  )
}
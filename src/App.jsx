// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createContext, useState } from 'react';

import Main from './page/Main';
import CreateRoom from './page/CreateRoom';
import JoinRoom from'./page/JoinRoom';
import GameReady from './page/GameReady';
import Test from './page/test';
import Test2 from './page/Test2';
import Test3 from './page/Test3';
import Result from './page/Result';
import Test4 from './page/Test4';

export const AppContext = createContext();

export default function App() {
  const [page, setPage] = useState("");
  const [team, setTeam] = useState("");
  const [topic, setTopic] = useState("");
  const [chat, setChat] = useState([]);
  const [channel, setChannel] = useState();
  const [code, setCode] = useState(Math.random().toString(36).substring(2,8));

  return (
    <AppContext.Provider value={{page, setPage, team, setTeam, topic, setTopic, chat, setChat, channel, setChannel,code, setCode}}>
      {
        page === "create" ? <CreateRoom /> :
        page === "join" ? <JoinRoom /> :
        page === "ready" ? <GameReady /> :
        page === "test"? <Test/> :
        page === "test2"? <Test2 /> :
        page === "test3"? <Test3 /> :
        page === "test4"? <Test4/> :
        page === "gemini-test" ? <Result /> :
        <Main />
      }
    </AppContext.Provider>
  )
}
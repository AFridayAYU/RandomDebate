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

export const AppContext = createContext();

export default function App() {
  const [page, setPage] = useState("");
  const [team, setTeam] = useState("");
  const [topic, setTopic] = useState("");
  const [channel, setChannel] = useState();

  return (
    <AppContext.Provider value={{page, setPage, team, setTeam, topic, setTopic, channel, setChannel}}>
      {
        page === "create" ? <CreateRoom /> :
        page === "join" ? <JoinRoom /> :
        page === "ready" ? <GameReady /> :
        page === "test"? <Test/> :
        page === "test2"? <Test2 /> :
        <Main />
      }
    </AppContext.Provider>
  )
}
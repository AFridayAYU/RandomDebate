// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Main from './page/Main';
import CreateRoom from './page/CreateRoom';
import JoinRoom from'./page/JoinRoom';
import GameReady from './page/GameReady';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Secondpage" element={<CreateRoom />} />
        <Route path="/Thirdpage" element={<JoinRoom />} />
        <Route path="/GameReady" element={<GameReady />} />
      </Routes>
    </Router>
  );
}
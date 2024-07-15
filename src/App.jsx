import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Secondpage from './page/Secondpage';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <>
      <h1>Random Debate</h1>
      <div style = {{ display: 'flex', flexDirection : 'column'}}>
        <button onClick={() => navigate('/Secondpage')}>
          토론방 만들기
        </button>
        <button>
          토론방 참여
        </button>
      </div>
    </>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Secondpage" element={<Secondpage />} />
      </Routes>
    </Router>
  );
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Random Debate</h1>
      <div style = {{ display: 'flex', flexDirection : 'column'}}>
        <button>
          토론방 만들기
        </button>
        <button>
          토론방 참여
        </button>
      </div>
    </>
  )
}

export default App
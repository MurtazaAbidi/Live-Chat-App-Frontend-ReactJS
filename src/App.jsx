import './App.css'
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io.connect("https://live-chat-app-backend-node-js.vercel.app/");
function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)

    }
  }

  return (
    <div className="App">
      {!showChat ?
        <div className='joinChatContainer'>
          <h1>Join a Chat</h1>
          <input type="text" placeholder='UserName' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
          <input type="text" placeholder='Room ID ' value={room} onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinRoom}>Join a Room</button>
        </div>

        : <Chat socket={socket} username={userName} room={room} />
      }
    </div>
  )
}

export default App

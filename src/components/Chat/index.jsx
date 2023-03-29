import React, { useEffect, useState } from 'react'
import ProfileRoom from '../../assets/ProfileRoom.jpg'
import Profile from '../../assets/profile.webp'


const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {

        let currDate = new Date();
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: currDate.getHours() + ':' + currDate.getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((oldMessages) => [...oldMessages, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        console.log(messageList)
        socket.on("receive_message", (data) => {
            console.log(data.message)
            console.log(messageList)
            setMessageList((oldMessages) => [...oldMessages, data])
        })
    }, [socket])

    return (
        <div className='chatMessaging-container'>
            <div className='chatMessaging-header'>
                <h1>Live Chatting Application</h1>
            </div>
            <div className='chat-box-container'>
                <div className='chat-top-personDetails'>
                    <img src={ProfileRoom} alt="profile" />
                    <h1>Room: {room}</h1>
                </div>
                <div className='chat-body'>
                    {messageList.map((element, index) => {
                        return (
                            <div key={index} className="chat-each-message" id={username === element.author ? 'you' : 'other'}>
                                <img src={Profile} alt="ProfilePic" />
                                <div>
                                    <h4>{element.author}</h4>
                                    <p>{element.message}</p>
                                    <p className='each-message-time'>{element.time}</p>
                                </div>
                            </div>
                        )

                    })}
                </div>
                <div className='chat-footer'>
                    <input type="text" placeholder='Enter your message ...' value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }} />
                    <button onClick={() => { sendMessage() }}>Send &#9658;</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
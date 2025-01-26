import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); //main server address

function DiscussionRoom() {
    const { id:id_room } = useParams(); //retrieving id room from url
    const username = localStorage.getItem("username");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); //state to track the message typed (the next one to be sent)

    useEffect(() => {
        socket.emit('create or join', id_room, username);

        //listener for new incoming message
        socket.on("message", (room, senderUsername, chatText) => {
            setMessages(prevMessages => [...prevMessages, { sender: senderUsername, text: chatText}]);
        });

        // callback to cleanup the socket
        return () => {
            socket.off("message");
        };
    }, [id_room, username]);

    const handleSend = () => {
        if (newMessage.trim() !== "") { //if message isn't empty
            socket.emit("message", id_room, username, newMessage)
            setMessages([...messages, { sender: "You", text: newMessage }]);
            setNewMessage(""); //cleanup textbox
        }
    };

    return (
        <div className="container mt-4">
            <h2>Chat Room {id_room}</h2>
            <div className="border p-3 mb-3" style={{ height: "300px", overflowY: "auto" }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`d-flex mb-2 ${msg.sender === "You" ? "justify-content-end" : "justify-content-start"}`}
                    >
                        <div className={`p-2 ${msg.sender === "You" ? "bg-primary text-white" : "bg-light"}`}>
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Let them know your thoughts..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default DiscussionRoom;

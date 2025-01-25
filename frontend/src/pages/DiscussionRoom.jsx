import { useState } from "react";
import { useParams } from "react-router-dom";

function DiscussionRoom() {
    const { id } = useParams();
    const [messages, setMessages] = useState([
        { sender: "Alice", text: "Hello, welcome to the discussion!" },
        { sender: "Bob", text: "Thanks! Excited to talk about this topic." },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { sender: "You", text: newMessage }]);
            setNewMessage("");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Chat Room {id}</h2>
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

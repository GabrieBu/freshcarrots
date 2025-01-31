import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Loader from "../ui/Loader.jsx";
import { format } from "date-fns";

const socket = io("http://localhost:3000"); //main server address

function DiscussionRoom() {
    const { id:id_room } = useParams(); //retrieving id room from url
    const username = localStorage.getItem("username");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); //state to track the message typed (the next one to be sent)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await axios.get("http://localhost:3000/getMessages", {
                    params: { id_room }
                });
                setMessages(res.data.messages); // set messages from the database in the local state
                setTitle(res.data.title);
            } catch (err) {
                console.error("Error fetching messages:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMessages(); //run the callback

        socket.emit('create or join', id_room, username);

        //listener for new incoming message
        socket.on("message", (room, senderUsername, chatText, time_stamp) => {
            setMessages(prevMessages => [...prevMessages, { sender: senderUsername, message: chatText, time_stamp: time_stamp }]);
        });

        //listener for new incoming message
        socket.on("image", (room, senderUsername, image, time_stamp) => {
            setMessages(prevMessages => [...prevMessages, { sender: senderUsername, image: image, time_stamp: time_stamp }]);
        });

        // callback to cleanup the socket
        return () => {
            socket.off("message");
        };

        //query to mongo for messages
    }, [id_room, username]);

    const handleSend = async () => {
        if (newMessage.trim() !== "" || selectedFile) { //if message isn't empty
            const time_stamp_message = new Date();
            socket.emit("message", id_room, username, newMessage, time_stamp_message)

            try {
                await axios.post("http://localhost:3000/newMessage", {
                    id_room: id_room,
                    sender: username,
                    message: newMessage,
                    time_stamp:  time_stamp_message
                });
            } catch (error) {
                /* @TODO handle better, displaying message*/
                console.error("Error saving message:", error);
                return;
            }

            setMessages([...messages, { sender: username, message: newMessage, image: selectedFile, time_stamp: time_stamp_message }]);
            setNewMessage(""); //cleanup textbox
            setSelectedFile(null); //cleanup selection

        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();

        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) {
            return format(date, "HH:mm"); // Show hours and minutes
        } else if (date.getFullYear() === today.getFullYear()) {
            return format(date, "MM/dd HH:mm"); // Show month and day
        } else {
            return format(date, "yyyy/MM/dd HH:mm"); // Show full date
        }
    };

    function handleFileSelect(ev) {
        const file = ev.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <h2 className="p-3">{title}</h2>
            {error && <h3 className="text-danger">Error loading messages from database!</h3>}
            <div className="border p-3 flex-grow-1 overflow-auto">
                {loading && <Loader />}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`d-flex mb-2 ${msg.sender === username ? "justify-content-end" : "justify-content-start"}`}
                    >
                        <div className={`p-2 rounded ${msg.sender === username ? "bg-primary text-white" : "bg-light"}`}>
                            {msg.sender !== username && <strong>{msg.sender}:</strong>} {msg?.message}
                            {msg?.image && (
                                <>
                                    {msg?.image.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                        <img src={msg?.image} alt="Attachment" className="img-fluid mt-2" style={{ maxWidth: "200px" }} />
                                    ) : (
                                        <video controls className="mt-2" style={{ maxWidth: "200px" }}>
                                            <source src={msg?.image} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </>
                            )}
                            <div className="text-muted small text-end">{formatTimestamp(msg?.time_stamp)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-group p-2 border-top">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Give your opinion..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <input type="file" className="form-control" onChange={handleFileSelect} accept="image/*,video/*"/>
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default DiscussionRoom;

import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Loader from "../ui/Loader.jsx";
import { format } from "date-fns";
import {useInView} from "react-intersection-observer";

const socket = io("http://localhost:3000"); //main server address
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

function DiscussionRoom() {
    const { id: id_room } = useParams()
    const username = localStorage.getItem("username");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const selectedFileRef = useRef(null); //to avoid no necessary re-renders
    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && hasMore) {
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView]);


    useEffect(() => {
        async function fetchMessages() {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get("http://localhost:3000/getMessages", {
                    params: { id_room, page: pageNumber },
                });
                setMessages(prevMessages => [...prevMessages, res.data.messages]);
                setTitle(res.data.title);
                setHasMore(res.data.hasMore);
                setError(false);
            } catch (err) {
                console.error("Error fetching messages:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMessages();
    }, [pageNumber]);

    useEffect(() => {
        socket.emit("create or join", id_room, username);

        socket.on("message", (room, senderUsername, chatText, time_stamp) => {
            setMessages(prevMessages => [
                ...prevMessages, { sender: senderUsername, message: chatText, time_stamp }
            ]);
        });

        socket.on("joined", (room, senderUsername) => {
            setMessages(prevMessages => [
                ...prevMessages, { username: senderUsername, type: "joined" }
            ]);
        });

        socket.on("image", (room, senderUsername, image, time_stamp) => {
            setMessages(prevMessages => [
                ...prevMessages, { sender: senderUsername, image, time_stamp }
            ]);
        });

        return () => {
            socket.off("message");
            socket.off("image");
        };
    }, [id_room, username]);


    const handleSend = async () => {
        if (newMessage.trim() !== "" || selectedFileRef.current) {
            const time_stamp_message = new Date();
            let imageBlob = null;

            if (selectedFileRef.current) {
                console.log("image")
                setUploading(true);
                imageBlob = await convertCanvasToImage();
                setUploading(false);
                socket.emit("image", id_room, username, imageBlob, time_stamp_message);
                try {
                    await axios.post("http://localhost:3000/newImage", {
                        id_room,
                        sender: username,
                        image: imageBlob,
                        time_stamp: time_stamp_message
                    });
                } catch (error) {
                    console.error("Error saving message:", error);
                    return;
                }
            } else {
                console.log("message")
                socket.emit("message", id_room, username, newMessage, time_stamp_message);

                try {
                    await axios.post("http://localhost:3000/newMessage", {
                        id_room,
                        sender: username,
                        message: newMessage,
                        time_stamp: time_stamp_message
                    });
                } catch (error) {
                    console.error("Error saving message:", error);
                    return;
                }
            }

            setMessages([...messages, { sender: username, message: newMessage, image: imageBlob, time_stamp: time_stamp_message }]);
            setNewMessage("");
            selectedFileRef.current = null;
        }
    };

    const handleFileSelect = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            selectedFileRef.current = file;
            loadImageToCanvas(file);
        }
    };

    const loadImageToCanvas = (file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                // Set canvas size to image size
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const convertCanvasToImage = () => {
        return new Promise((resolve) => {
            const canvas = canvasRef.current;
            resolve(canvas.toDataURL("image/png")); // convert to Base64 (blob)
        });
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <h2 className="p-3">{title}</h2>
            {error && <h3 className="text-danger">Error loading messages from database!</h3>}
            <div className="border p-3 flex-grow-1 overflow-auto">
                {loading && <Loader />}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        ref={index === 0 ? ref : null}
                        className={`d-flex mb-2 ${msg?.type === "joined" ? "justify-content-center" : msg.sender === username ? "justify-content-end" : "justify-content-start"}`}
                    >
                        <div
                            className={`p-2 rounded ${msg?.type === "joined" ? "bg-transparent text-muted small" : msg.sender === username ? "bg-primary text-white" : "bg-light"}`}
                            style={msg?.type === "joined" ? {fontSize: "0.8rem", fontWeight: "bold"} : {}}
                        >
                            {msg?.type === "joined" ?
                                <span>{msg?.username} connected to the chat!</span> : (<>
                                    {msg.sender !== username && <strong>{msg.sender}:</strong>}
                                        {msg?.message && (
                                            <div className="message-text" style={{padding: "2px"}}>
                                                {msg?.message}
                                            </div>
                                        )}
                                        {msg?.image && (
                                            <div className="image-container" style={{padding: "0"}}>
                                                <img src={msg?.image} alt="Attachment" className="img-fluid mt-2"
                                                     style={{maxWidth: "548px", minWidth: "308px"}}/>
                                            </div>
                                        )}
                                        <div className="text-muted small text-end">{formatTimestamp(msg?.time_stamp)}</div>
                                </>)}
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
                <input
                    type="file"
                    className="form-control"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                />
                <button className="btn btn-primary" onClick={handleSend}>
                    {uploading ? "Uploading..." : "Send"}
                </button>
                <canvas ref={canvasRef} style={{display: "none"}}></canvas>
            </div>
        </div>
    );
}

export default DiscussionRoom;

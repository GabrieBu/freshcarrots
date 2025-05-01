import axios from "axios";
import io from "socket.io-client";
import { format } from "date-fns";
import { lazy, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Loader = lazy(() => import("../ui/Loader"));

const socket = io("http://localhost:3000");

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();

    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    if (isToday) {
        return format(date, "HH:mm");
    } else if (date.getFullYear() === today.getFullYear()) {
        return format(date, "MM/dd HH:mm");
    } else {
        return format(date, "yyyy/MM/dd HH:mm");
    }
};

function DiscussionRoom() {
    const { id: id_room } = useParams();
    const username = localStorage.getItem("username");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [readyForScroll, setReadyForScroll] = useState(false);

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const selectedFileRef = useRef(null);
    const chatContainerRef = useRef(null);

    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && hasMore && readyForScroll) {
            setPageNumber((prev) => prev + 1);
        }
    }, [inView, hasMore, readyForScroll]);

    useEffect(() => {
        async function fetchMessages() {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get("http://localhost:3000/getMessages", {
                    params: { id_room, page: pageNumber },
                });

                setMessages((prevMessages) => {
                    const messageSet = new Set(prevMessages.map((msg) => msg.time_stamp));
                    const newMessages = res.data.messages.filter(
                        (msg) => !messageSet.has(msg.time_stamp)
                    );
                    return [...newMessages, ...prevMessages]; // prepend for top-down paging
                });

                setTitle(res.data.title);
                setHasMore(res.data.hasMore);
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
            setMessages((prev) => [
                ...prev,
                { sender: senderUsername, message: chatText, time_stamp },
            ]);
            scrollToBottom();
        });

        socket.on("image", (room, senderUsername, image, time_stamp) => {
            setMessages((prev) => [
                ...prev,
                { sender: senderUsername, image, time_stamp },
            ]);
            scrollToBottom();
        });

        return () => {
            socket.off("message");
            socket.off("image");
        };
    }, [id_room, username]);

    useEffect(() => {
        // Scroll to bottom on initial load
        const timeout = setTimeout(() => {
            scrollToBottom();
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "auto", // instant scroll
            });

            // delay enabling scroll trigger to prevent first inView fire
            setTimeout(() => {
                setReadyForScroll(true);
            }, 300);
        }
    };

    const handleSend = async () => {
        if (newMessage.trim() === "" && !selectedFileRef.current) return;

        const time_stamp_message = new Date();
        let imageBlob = null;

        if (selectedFileRef.current) {
            setUploading(true);
            imageBlob = await convertCanvasToImage();
            setUploading(false);

            socket.emit("image", id_room, username, imageBlob, time_stamp_message);
            try {
                await axios.post("http://localhost:3000/newImage", {
                    id_room,
                    sender: username,
                    image: imageBlob,
                    time_stamp: time_stamp_message,
                });
            } catch (error) {
                console.error("Error saving image:", error);
            }
        }

        if (newMessage.trim() !== "") {
            socket.emit("message", id_room, username, newMessage, time_stamp_message);
            try {
                await axios.post("http://localhost:3000/newMessage", {
                    id_room,
                    sender: username,
                    message: newMessage,
                    time_stamp: time_stamp_message,
                });
            } catch (error) {
                console.error("Error saving message:", error);
            }
        }

        setMessages((prev) => [
            ...prev,
            {
                sender: username,
                message: newMessage.trim() || null,
                image: imageBlob,
                time_stamp: time_stamp_message,
            },
        ]);

        setNewMessage("");
        selectedFileRef.current = null;
        fileInputRef.current.value = null;
        scrollToBottom();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
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
            resolve(canvas.toDataURL("image/png"));
        });
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <h2 className="p-3">{title}</h2>
            {error && (
                <h3 className="text-danger">Error loading messages from database!</h3>
            )}
            <div
                className="border p-3 flex-grow-1 overflow-auto"
                ref={chatContainerRef}
            >
                {loading && <Loader />}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        ref={index === 0 ? ref : null}
                        className={`d-flex mb-2 ${
                            msg.sender === username
                                ? "justify-content-end"
                                : "justify-content-start"
                        }`}
                    >
                        <div
                            className={`p-2 rounded ${
                                msg.sender === username ? "bg-primary text-white" : "bg-light"
                            }`}
                        >
                            {msg.sender !== username && <strong>{msg.sender}:</strong>}
                            {msg?.image && (
                                <div className="image-container" style={{ padding: "0" }}>
                                    <img
                                        src={msg?.image}
                                        alt="Attachment"
                                        className="img-fluid mt-2"
                                        style={{ maxWidth: "548px", minWidth: "308px" }}
                                    />
                                </div>
                            )}
                            {msg?.message && (
                                <div className="message-text" style={{ padding: "2px" }}>
                                    {msg?.message}
                                </div>
                            )}
                            <div className="text-muted small text-end">
                                {formatTimestamp(msg?.time_stamp)}
                            </div>
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
                    onKeyDown={handleKeyPress}
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
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
        </div>
    );
}

export default DiscussionRoom;

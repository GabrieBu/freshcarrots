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
        <div className="container-fluid vh-100 d-flex flex-column bg-light">
            <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm">
                <button
                    className="btn btn-outline-secondary me-3"
                    onClick={() => window.history.back()}
                >
                    ← Back
                </button>
                <h4 className="m-0 text-primary">{title}</h4>
                <div style={{ width: "42px" }}></div> {/* Spacer */}
            </div>

            {error && (
                <div className="alert alert-danger text-center">
                    Error loading messages from database!
                </div>
            )}

            <div
                className="flex-grow-1 overflow-auto px-3 py-2"
                ref={chatContainerRef}
                style={{ backgroundColor: "#f8f9fa", borderTop: "1px solid #dee2e6" }}
            >
                {loading && <Loader />}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        ref={index === 0 ? ref : null}
                        className={`d-flex mb-3 ${
                            msg.sender === username ? "justify-content-end" : "justify-content-start"
                        }`}
                    >
                        <div
                            className={`p-3 shadow-sm rounded-4 ${
                                msg.sender === username ? "bg-primary text-white" : "bg-white"
                            }`}
                            style={{ maxWidth: "75%", position: "relative" }}
                        >
                            {msg.sender !== username && (
                                <div className="fw-bold mb-1">{msg.sender}</div>
                            )}
                            {msg?.image && (
                                <img
                                    src={msg?.image}
                                    alt="Attachment"
                                    className="img-fluid rounded mb-2"
                                    style={{ maxWidth: "100%", borderRadius: "12px" }}
                                />
                            )}
                            {msg?.message && (
                                <div className="mb-1">{msg?.message}</div>
                            )}
                            <div
                                className={`small text-end ${
                                    msg.sender === username ? "text-light" : "text-muted"
                                }`}
                            >
                                {formatTimestamp(msg?.time_stamp)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-group p-3 border-top bg-white shadow-sm">
                <input
                    type="text"
                    className="form-control rounded-start-pill"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={{ marginRight: "0.5rem" }}
                />
                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{display: "none"}}
                />
                <label
                    htmlFor="fileUpload"
                    className="image-upload-button me-2"
                    title="Attach an image"
                    style={{
                        border: selectedFileRef.current ? "3px solid #28a745" : "3px solid transparent",
                        borderRadius: "50%",
                        width: "64px",
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        transition: "border 0.3s ease",
                        cursor: "pointer",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <img
                        src="./../../public/icons8-image-64.png"
                        alt="Upload"
                        style={{
                            width: "40px",
                            height: "40px",
                            opacity: selectedFileRef.current ? 0.6 : 1,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                </label>
                <button
                    className={`btn btn-${uploading ? "secondary" : "primary"} rounded-end-pill`}
                    onClick={handleSend}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Send"}
                </button>
                <canvas ref={canvasRef} style={{display: "none"}}></canvas>
            </div>
        </div>
    );

}

export default DiscussionRoom;
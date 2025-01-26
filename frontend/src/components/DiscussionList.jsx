import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* @TODO EDIT with query to mongodb */
const discussionsInit = [
    { id: 1, title: "React Best Practices" },
    { id: 2, title: "State Management Strategies" },
    { id: 3, title: "Upcoming React Features" },
];


function DiscussionList() {
    const [joinedDiscussions, setJoinedDiscussions] = useState([]);
    const [discussions, setDiscussions] = useState(discussionsInit);
    const [username, setUsername] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);

    // load joined discussions from localstorage when the component for the first time rendered
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("username")) || "";
        if(user !== "")
            setUsername(user);
        else {
            const modalElement = document.getElementById('modalUsername');
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
            return;
        }
        const storedDiscussions = JSON.parse(localStorage.getItem("joinedDiscussions")) || [];
        setJoinedDiscussions(storedDiscussions); //update the state
    }, []);

    function handleCloseModal() {
        //close modal
        /* @TODO not interesting now*/
    }

    function handleSubmitModal() {
        localStorage.setItem("username", JSON.stringify(username));
    }

    // handler when Join room clickes
    const handleJoin = (id) => {
        if (!joinedDiscussions.includes(id)) {
            const updatedDiscussions = [...joinedDiscussions, id]; //update array of joined discussions
            setJoinedDiscussions(updatedDiscussions);
            localStorage.setItem("joinedDiscussions", JSON.stringify(updatedDiscussions));
        }
    };

    // handler when leave room clicked
    const handleLeave = (id) => {
        const updatedDiscussions = joinedDiscussions.filter(discussionId => discussionId !== id); //update array of joined discussions
        setJoinedDiscussions(updatedDiscussions);
        localStorage.setItem("joinedDiscussions", JSON.stringify(updatedDiscussions));
    };

    function handleCreateDiscussion() {
        if (newTitle.trim() === "") return; // Prevent empty discussions

        const newDiscussion = {
            id: Math.random().toString(36).substr(2, 9), // Generate random ID
            title: newTitle,
        };

        const updatedDiscussions = [...discussions, newDiscussion];
        setDiscussions(updatedDiscussions);
        setNewTitle(""); // Reset input field
        /* @TODO query mongodb to add a new discussion */
    }

    return (<>
            <div id="modalUsername" className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog"
                 aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="mySmallModalLabel">Enter a username to discuss among
                                members.</h5>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmitModal}>
                                Submit
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showCreateDiscussion && <div className="container mt-4">
                <h2>Create a New Discussion</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter discussion title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={handleCreateDiscussion}>
                        Create
                    </button>
                </div>
            </div>}

            <div className="container mt-4">
                <button className={`btn ${!showCreateDiscussion ? "btn-success" : "btn-danger"}`} onClick={() => setShowCreateDiscussion((prev) => !prev)}>{!showCreateDiscussion ? "Create a new discussion" : "Close X"}</button>
            </div>

            <div className="container mt-4">
                <h2>Discussions</h2>
                <ul className="list-group">
                    {discussions.map((discussion) => (
                        <li key={discussion.id}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <Link to={`/discussion/${discussion.id}`} className="text-decoration-none fw-bold">
                                    {discussion.title}
                                </Link>
                                {joinedDiscussions.includes(discussion.id) && (
                                    <span className="badge bg-success ms-2">Joined</span>
                                )}
                            </div>
                            {joinedDiscussions.includes(discussion.id) ? (
                                <button className="btn btn-danger" onClick={() => handleLeave(discussion.id)}>
                                    Leave Room
                                </button>
                            ) : (
                                <Link to={`/discussion/${discussion.id}`} className="btn btn-primary"
                                      onClick={() => handleJoin(discussion.id)}>
                                    Join Room
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default DiscussionList;

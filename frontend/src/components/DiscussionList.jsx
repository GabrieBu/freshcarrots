import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useDiscussions from "../hooks/useDiscussions.js";
import Loader from "../ui/Loader.jsx";

function DiscussionList() {
    const [followedDiscussions, setFollowedDiscussions] = useState([]);
    const [username, setUsername] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
    const [errorCreate, setErrorCreate] = useState(false);
    const { discussions, setDiscussions, error, isLoading } = useDiscussions();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("username")) || "";
        if (user) {
            setUsername(user);
        } else {
            const modalElement = document.getElementById("modalUsername");
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
            return;
        }
        const storedDiscussions = JSON.parse(localStorage.getItem("followedDiscussions")) || [];
        setFollowedDiscussions(storedDiscussions);
    }, []);

    function handleSubmitModal() {
        localStorage.setItem("username", JSON.stringify(username));
    }

    // Add discussion to followedDiscussions and remove it from discussions
    const handleFollow = (id, title) => {
        if (!followedDiscussions.some((d) => d.id === id)) {
            const updatedFollowed = [...followedDiscussions, { id, title }];
            setFollowedDiscussions(updatedFollowed);
            localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed));

            // Remove followed discussion from discussions list
            setDiscussions((prevDiscussions) => prevDiscussions.filter((d) => d.id !== id));
        }
    };

    // Remove discussion from followedDiscussions and add it back to discussions
    const handleUnfollow = (id, title) => {
        const updatedFollowed = followedDiscussions.filter((d) => d.id !== id);
        setFollowedDiscussions(updatedFollowed);
        localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed));

        // Re-add unfollowed discussion to discussions
        setDiscussions((prevDiscussions) => [...prevDiscussions, { id, title }]);
    };

    function handleCreateDiscussion() {
        if (newTitle.trim() === "") return;

        const newDiscussion = {
            id: Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10),
            title: newTitle,
        };

        axios
            .post("http://localhost:3000/newDiscussion", newDiscussion)
            .then(() => {
                setDiscussions((prevDiscussions) => [...prevDiscussions, newDiscussion]);
                setNewTitle("");
            })
            .catch(() => setErrorCreate(true));
    }

    // Derived state: Remove followed discussions from the main discussions list
    const filteredDiscussions = discussions.filter(
        (d) => !followedDiscussions.some((fd) => fd.id === d.id)
    );

    return (
        <>
            <div id="modalUsername" className="modal fade" tabIndex="-1">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enter a username to discuss among members.</h5>
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
                            <button className="btn btn-primary" onClick={handleSubmitModal}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {errorCreate && <h2 className="text-danger">Error creating new discussion. Try again later!</h2>}
            {showCreateDiscussion && (
                <div className="container mt-4">
                    <h2>Create a New Discussion</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter discussion title..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <button className="btn btn-success" onClick={handleCreateDiscussion}>Create</button>
                    </div>
                </div>
            )}

            <div className="container mt-4">
                <button
                    className={`btn ${!showCreateDiscussion ? "btn-success" : "btn-danger"}`}
                    onClick={() => setShowCreateDiscussion((prev) => !prev)}
                >
                    {!showCreateDiscussion ? "Create a new discussion" : "Close X"}
                </button>
            </div>
            <div className="container mt-4">
                {followedDiscussions.length > 0 && (
                    <div className="mb-4">
                        <h2>❤️ Followed discussions: </h2>
                        <ul className="list-group">
                            {followedDiscussions.map(({ id, title }) => (
                                <li key={id} className="list-group-item d-flex justify-content-between">
                                    <div>
                                        <Link to={`/discussion/${id}`} className="text-decoration-underline fw-medium">
                                            {title}
                                        </Link>
                                        <span className="badge bg-success ms-2">Joined</span>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => handleUnfollow(id, title)}>
                                        Unfollow Room
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {error && <h2 className="text-danger">Could not load past discussions.</h2>}
                {!isLoading ? (
                    <>
                        <h2>Discussions</h2>
                        <ul className="list-group">
                            {filteredDiscussions.map(({ id, title }) => (
                                <li key={id} className="list-group-item d-flex justify-content-between">
                                    <div>
                                        <Link to={`/discussion/${id}`} className="text-decoration-underline fw-medium">
                                            {title}
                                        </Link>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => handleFollow(id, title)}>
                                        Follow Discussion
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}

export default DiscussionList;

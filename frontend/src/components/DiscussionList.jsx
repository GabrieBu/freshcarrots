
import axios from "axios";
import { Link } from "react-router-dom";
import {lazy, useEffect, useState} from "react";
import useDiscussions from "../hooks/useDiscussions.js";

const Loader = lazy(() => import("../ui/Loader"));

function DiscussionList() {
    const [followedDiscussions, setFollowedDiscussions] = useState([]);
    const [username, setUsername] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
    const [errorCreate, setErrorCreate] = useState(false);
    const { discussions, setDiscussions, error, isLoading } = useDiscussions();
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        /* initialize username retrieving from local storage */
        const user = JSON.parse(localStorage.getItem("username")) || "";
        if (user) {
            setUsername(user);
        } else {
            //if not present ask the user to insert it
            const modalElement = document.getElementById("modalUsername");
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show(); //show the bootstrap modal
            return;
        }
        //retrieve past followed discussion from the localstorage, if present
        const storedDiscussions = JSON.parse(localStorage.getItem("followedDiscussions")) || [];
        setFollowedDiscussions(storedDiscussions);
    }, []);

    // submiut username in the modal, store in useState
    function handleSubmitModal() {
        if(username!== "") {
            localStorage.setItem("username", JSON.stringify(username));
            const modalElement = document.getElementById("modalUsername");
            const modal = window.bootstrap.Modal.getInstance(modalElement)
            modal.hide();

            document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
        }
        else{
            setErrorModal(true);
        }

    }

    //it updates followed discussion, useState and localStorage (for future retrieves)
    const handleFollow = (id, title) => {
        if (!followedDiscussions.some((d) => d.id === id)) {
            const updatedFollowed = [...followedDiscussions, { id, title }];
            setFollowedDiscussions(updatedFollowed);
            localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed)); //set to local storage

            setDiscussions((prevDiscussions) => prevDiscussions.filter((d) => d.id !== id));
        }
    };

    const handleUnfollow = (id, title) => {
        const updatedFollowed = followedDiscussions.filter((d) => d.id !== id); //save all discussion instead of the new unfollowed
        setFollowedDiscussions(updatedFollowed);
        localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed)); //update (remove) followed discussion

        setDiscussions((prevDiscussions) => [...prevDiscussions, { id, title }]); //update local state
    };

    function handleCreateDiscussion() {
        if (newTitle.trim() === "") return;

        const newDiscussion = {
            id: Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10), //randomize id to be stored in the db
            title: newTitle, //title of the discussion
        };

        //call the endpoint newDiscussion, see swagger to documentation
        axios
            .post("http://localhost:3000/newDiscussion", newDiscussion)
            .then(() => {
                //discussion stored, update local state
                setDiscussions((prevDiscussions) => [...prevDiscussions, newDiscussion]); //update local state
                setNewTitle("");
            })
            .catch(() => setErrorCreate(true));
    }

    const filteredDiscussions = discussions.filter(
        (d) => !followedDiscussions.some((fd) => fd.id === d.id) //split followed discussion from not followed
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
                            {errorModal && <h6 className="text-danger">Username is required</h6>}
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
                        <h2>❤️ Followed discussions [{followedDiscussions?.length}]</h2>
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
                        <h2>Discussions [{discussions?.length}]</h2>
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
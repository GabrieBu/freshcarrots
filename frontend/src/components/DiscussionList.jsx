
import axios from "axios";
import { Link } from "react-router-dom";
import {lazy, useEffect, useState} from "react";
import useDiscussions from "../hooks/useDiscussions.js";
import Searchbar from "./Searchbar.jsx";
import SearchCardCommunity from "./SearchCardCommunity.jsx";
import DiscussionItem from "./DiscussionItem.jsx";

const Loader = lazy(() => import("../ui/Loader"));

function DiscussionList() {
    const [followedDiscussions, setFollowedDiscussions] = useState([]);
    const [username, setUsername] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
    const [errorCreate, setErrorCreate] = useState(false);
    const { discussions, setDiscussions, error, isLoading } = useDiscussions();
    const [errorModal, setErrorModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();

    console.log(discussions);

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
            const fullDiscussion = discussions.find((d) => d.id === id);

            const updatedFollowed = [  //set to local storage
                ...followedDiscussions,
                {
                    id,
                    title,
                    movie: fullDiscussion?.movie || null  // store movie info if available
                }
            ];

            setFollowedDiscussions(updatedFollowed);
            localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed)); // persist in local storage

            setDiscussions((prevDiscussions) => prevDiscussions.filter((d) => d.id !== id));
        }
    };

    const handleUnfollow = (id, title) => {
        const unfollowed = followedDiscussions.find((d) => d.id === id); //save all discussion instead of the new unfollowed
        const updatedFollowed = followedDiscussions.filter((d) => d.id !== id);

        setFollowedDiscussions(updatedFollowed);
        localStorage.setItem("followedDiscussions", JSON.stringify(updatedFollowed)); //update (remove) followed discussion

        setDiscussions((prevDiscussions) => [
            ...prevDiscussions.filter((d) => d.id !== id), // remove if already present
            {
                id,
                title,
                movie: unfollowed?.movie || null  //update local state
            }
        ]);
    };

    function handleCreateDiscussion() {
        if (newTitle.trim() === "") return;

        const newDiscussion = {
            id: Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10), //randomize id to be stored in the db
            title: newTitle, //title of the discussion
            movie: selectedMovie //movie related
        };

        //call the endpoint newDiscussion, see swagger to documentation
        axios
            .post("http://localhost:3000/newDiscussion", newDiscussion)
            .then(() => {
                //discussion stored, update local state
                setDiscussions((prevDiscussions) => [...prevDiscussions, newDiscussion]); //update local state
                setNewTitle("");
                setSelectedMovie(null);
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

                    <div className="row">
                        {selectedMovie && (
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <img
                                        src={selectedMovie?.poster}
                                        className="card-img-top"
                                        alt={selectedMovie?.name}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{selectedMovie?.name}</h5>
                                        <p className="card-text text-muted">{selectedMovie?.year}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={selectedMovie ? "col-md-8" : "col-md-12"}>
                            <div className="row g-3 align-items-end">
                                <div className="col-md-8">
                                    <label className="form-label">Search Movie</label>

                                    {!selectedMovie ? (
                                        <Searchbar onSelectMovie={setSelectedMovie}>
                                            {(movie) => (
                                                <SearchCardCommunity key={movie.id} movie={movie} onSelectMovie={setSelectedMovie} />
                                            )}
                                        </Searchbar>
                                    ) : (
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={selectedMovie.name}
                                                readOnly
                                            />
                                            <button
                                                className="btn btn-outline-danger"
                                                type="button"
                                                onClick={() => setSelectedMovie(null)}
                                                title="Clear selection"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-8">
                                    <label className="form-label">Discussion Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter discussion title..."
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={handleCreateDiscussion}
                                        disabled={!selectedMovie || !newTitle.trim()}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
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
                {followedDiscussions.map((discussion) => {
                    const poster = discussion?.movie?.poster;

                    return (
                        <DiscussionItem
                            key={discussion.id}
                            id={discussion.id}
                            title={discussion.title}
                            poster={poster}
                            joined={true}
                            onClick={() => handleUnfollow(discussion.id, discussion.title)}
                            buttonLabel="Unfollow Room"
                            buttonVariant="danger"
                        />
                    );
                })}

                {error && <h2 className="text-danger">Could not load past discussions.</h2>}
                {!isLoading ? (
                    <>
                        <h2>Discussions [{discussions?.length}]</h2>
                        {filteredDiscussions.map((discussion) => (
                            <DiscussionItem
                                key={discussion.id}
                                id={discussion.id}
                                title={discussion.title}
                                poster={discussion?.movie?.poster}
                                onClick={() => handleFollow(discussion.id, discussion.title)}
                                buttonLabel="Follow Discussion"
                            />
                        ))}
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}

export default DiscussionList;
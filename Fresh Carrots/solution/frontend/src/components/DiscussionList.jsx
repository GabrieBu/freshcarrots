
import axios from "axios";
import {useEffect, useState} from "react";
import useDiscussions from "../hooks/useDiscussions.js";
import Searchbar from "./Searchbar.jsx";
import SearchCardCommunity from "./SearchCardCommunity.jsx";
import DiscussionItem from "./DiscussionItem.jsx";
import {useNavigate} from "react-router-dom";
import UserModal from "./UserModal.jsx";


function DiscussionList() {
    const [username, setUsername] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
    const [errorCreate, setErrorCreate] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState();
    const [movieQuery, setMovieQuery] = useState(() => {
        return localStorage.getItem("movieQuery") || "";
    });
    const [sortByDate, setSortByDate] = useState(() => {
        return localStorage.getItem("sortByDate") || "desc";
    });

    const navigate = useNavigate();

    const { discussions, error, loading } = useDiscussions(movieQuery, sortByDate);

    useEffect(() => {
        localStorage.setItem("movieQuery", movieQuery);
    }, [movieQuery]);

    useEffect(() => {
        localStorage.setItem("sortByDate", sortByDate);
    }, [sortByDate]);


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
                setNewTitle("");
                setSelectedMovie(null);
                navigate(`/discussion/${newDiscussion.id}`);
            })
            .catch(() => setErrorCreate(true));
    }

    function handleFollow(id, title) {

    }

    return (
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <UserModal username={username} onSetUsername={setUsername}/>

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
                                        style={{height: '300px', objectFit: 'cover'}}
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
                                                <SearchCardCommunity key={movie.id} movie={movie}
                                                                     onSelectMovie={setSelectedMovie}/>
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

            <div
                className="bg-light p-3 mt-4 mb-4 shadow-sm rounded"
                style={{border: "1px solid #ccc"}}
            >
                <div className="row gy-2">
                    <div className="col-md-3">
                        <label htmlFor="DiscussionMovieFilter" className="form-label">
                            Name movie:
                        </label>
                        <input
                            id="DiscussionMovieFilter"
                            type="text"
                            className="form-control"
                            placeholder="Search movie title"
                            value={movieQuery}
                            onChange={(e) => setMovieQuery(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="SortByDate" className="form-label">
                            Sort by Date:
                        </label>
                        <select
                            id="SortByDate"
                            className="form-select"
                            value={sortByDate}
                            onChange={(e) => setSortByDate(e.target.value)}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>

                    <div className="col-md-2 d-flex align-items-end">
                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={() => {
                                setMovieQuery("");
                                setSortByDate("desc");
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {error && <h2 className="text-danger">Could not load past discussions.</h2>}
            {!loading && (
                <>
                    <hr className="my-4 border-top border-secondary opacity-25"/>
                    <h2>Discussions [{discussions?.length > 0 && discussions?.length}]</h2>
                    {discussions?.length > 0 ? discussions.map((discussion, index) => {
                        return (
                            <>
                                <DiscussionItem
                                    key={index}
                                    id={discussion.id}
                                    title={discussion.title}
                                    movie={discussion?.movie}
                                    onClick={() => handleFollow(discussion.id, discussion.title)}
                                    buttonLabel="Follow Discussion"
                                    createdAt={discussion?.date}
                                />
                            </>
                        );
                    }) : <h4 className="text-primary text-center">No discussion found</h4>}
                </>
            )}
        </div>
    );
}

export default DiscussionList;
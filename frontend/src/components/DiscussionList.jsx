import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* @TODO EDIT with query to mongodb */
const discussions = [
    { id: 1, title: "React Best Practices" },
    { id: 2, title: "State Management Strategies" },
    { id: 3, title: "Upcoming React Features" },
];

function DiscussionList() {
    const [joinedDiscussions, setJoinedDiscussions] = useState([]);

    // load joined discussions from localstorage when the component for the first time rendered
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem("joinedDiscussions")) || [];
        setJoinedDiscussions(storedDiscussions);
    }, []);

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

    return (
        <div className="container mt-4">
            <h2>Discussions</h2>
            <ul className="list-group">
                {discussions.map((discussion) => (
                    <li key={discussion.id} className="list-group-item d-flex justify-content-between align-items-center">
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
                            <Link to={`/discussion/${discussion.id}`} className="btn btn-primary" onClick={() => handleJoin(discussion.id)}>
                                Join Room
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DiscussionList;

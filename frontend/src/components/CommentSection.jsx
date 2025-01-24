import {useState} from "react";
import Comment from "./Comment.jsx";

function CommentSection() {
    const [comments, setComments] = useState([]);
    /*
    * @TODO query comments
    *    */
    return (
    <div className="container mt-4">
        <h2>Comments</h2>
        <form className="mb-3">
            <input type="text" className="form-control mb-2" placeholder="Your name"/>
            <textarea className="form-control mb-2" placeholder="Write a comment..."></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
        <div className="comments">
            {comments?.map((comment, index) => (<Comment key={index} comment={comment} />))}
        </div>
    </div>);
}

export default CommentSection;
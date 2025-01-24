// eslint-disable-next-line react/prop-types
function Comment({comment}) {
    // eslint-disable-next-line react/prop-types
    const {user, date, text_comment} = comment;
    return (
    <div className="border p-3 mb-2 bg-light rounded">
        <strong>{user}</strong> <span className="text-muted">{date}</span>
        <p className="mb-0">{text_comment}</p>
    </div>);
}

export default Comment;
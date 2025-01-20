// eslint-disable-next-line react/prop-types
function Card({title}) {
    return(
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src="https://imgs.search.brave.com/wfsnB6LU7T8e4MZpxQXhJ_B7mkSwD6VNcxGwYC4vLtE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly80ZGRp/Zy50ZW5vcnNoYXJl/LmNvbS9pbWFnZXMv/cGhvdG8tcmVjb3Zl/cnkvaW1hZ2VzLW5v/dC1mb3VuZC5qcGc" alt="Card image cap"/>
            <div className="card-body">
                <p className="card-text">{title}</p>
            </div>
        </div>
    );
}


export default Card

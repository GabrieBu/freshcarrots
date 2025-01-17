import Card from "./Card.jsx";

function Cards() {
    const cardsTitle = [
        "The Godfather",
        "The Dark Knight",
        "Inception",
        "Forrest Gump",
        "Pulp Fiction",
        "The Matrix",
        "Titanic",
        "The Shawshank Redemption",
        "Interstellar",
        "Fight Club",
        "The Lord of the Rings: The Return of the King",
        "Schindler's List",
        "Gladiator",
        "Jurassic Park",
        "The Lion King",
        "Star Wars: Episode V - The Empire Strikes Back"
    ];

    return(
    <div className="container d-flex flex-wrap gap-4 justify-content-center">
        {cardsTitle.map((title, index) => <Card key={index} title={title} />)}
        <div className="">
            <a href="" className="text-primary">Load more...</a>
        </div>
    </div>);
}

export default Cards;
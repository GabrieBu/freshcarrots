import Movie from "../models/Movie.js";

export const getLatestMovies = async (req, res) => {
    try {
        const movies = await Movie.find().limit(100); //limit to 100 otherwise it would be a BIG query
        console.log("Movies returned: " + JSON.stringify(movies));
        res.json(movies);
    } catch (error) {
        res.json({ error_message: error.message });
    }
};
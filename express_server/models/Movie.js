import {Schema} from "mongoose";

var Movie = new Schema(
    {
        id: {type: Number},
        name: {type: String},
        date: {type: Number},
        tagline: {type: String},
        description: {type: String},
        minute: {type: Number},
    }
);

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
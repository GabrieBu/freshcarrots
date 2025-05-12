import mongoose, {Schema} from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: ""
    },
    time_stamp: {
        type: Date,
        default: Date.now,
    },
});

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
    year: {
        type: Number
    },
    poster: {
        type: String
    },
});

var DiscussionSchema = new Schema(
    {
        id: {type: String, required: true},
        title: {type: String, required: true},
        movie: {type: movieSchema, required: true},
        messages: {type: [messageSchema], required: true, default: []}, //array of messages
    }
);

const Discussion = mongoose.model("Discussion", DiscussionSchema);
export default Discussion;
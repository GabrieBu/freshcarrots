import mongoose, {Schema} from "mongoose";

var ReviewSchema = new Schema(
    {
        id: {type: Schema.Types.ObjectId, ref: 'Review'},
        movie_title: {type: String},
        critic_name: {type: String},
        top_critic: {type: Boolean},
        publisher_name: {type: String},
        review_type: {type: String},
        review_date: {type: Date},
        review_content: {type: String},
        link: {type: String},
    }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
import mongoose, {Schema} from "mongoose";

var ReviewSchema = new Schema(
    {
        /*id: {type: Number},
        name: {type: String},
        date: {type: Number},
        tagline: {type: String},
        description: {type: String},
        minute: {type: Number},*/
    }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
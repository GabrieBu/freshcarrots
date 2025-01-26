import Discussion from "../models/Discussion.js";
import discussion from "../models/Discussion.js";

export const newDiscussion = async (req, res) => {
    try {
        const { title, id } = req.body;
        const newDiscussion = new Discussion({ title, id });
        await newDiscussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find({})
        res.json(discussions);
    } catch (error) {
        res.json({ error_message: error.message });
    }
};
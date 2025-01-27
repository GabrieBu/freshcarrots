import Discussion from "../models/Discussion.js";

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

export const getMessages = async (req, res) => {
    try {
        const {id_room} = req.body
        const discussion = await Discussion.find({id: id_room});
        console.log("discussion" + JSON.stringify(discussion));
        const {title, messages} = discussion;
        res.json({title, messages});
    } catch (error) {
        res.json({ error_message: error.message });
    }
};

export const newMessage = async (req, res) => {
    try {
        const { discussionId, sender, message } = req.body; // Extract data from request
        const discussion = await Discussion.findOne({ id: discussionId });

        if (!discussion) { //discussion doesn't exist
            return res.status(404).json({ error: "Discussion not found" });
        }

        const newMessage = {
            sender,
            message,
            time_stamp: new Date(),
        };

        discussion.messages.push(newMessage);
        await discussion.save();

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
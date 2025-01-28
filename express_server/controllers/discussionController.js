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
        const { id_room } = req.query;
        if (!id_room) {
            return res.status(400).json({ error: "Room ID is required" });
        }
        const discussion = await Discussion.findOne({ id: id_room });
        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        console.log("Discussion:", discussion);
        res.json({ title: discussion.title, messages: discussion.messages });
    } catch (error) {
        res.json({ error_message: error.message });
    }
};

export const newMessage = async (req, res) => {
    try {
        const { id_room, sender, message } = req.body;

        if (!id_room || !sender || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const discussion = await Discussion.findOne({ id: id_room });

        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        discussion.messages.push({ sender, message, time_stamp: new Date() });
        await discussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
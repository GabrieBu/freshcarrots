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
        res.json({ error: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id_room, page} = req.query;
        console.log(id_room, page)

        if (!id_room) {
            return res.status(400).json({ error: "Room ID is required" });
        }

        //calculate offset and limit to get only 30 messages time by time
        const offsetNum = Number(page)*30;
        const limitNum = (Number(page + 1) * 30) - 1;
        console.log("offsetNum e limitNum", offsetNum, limitNum);

        const discussion = await Discussion.findOne({ id: id_room },{messages:{ $slice: [-offsetNum - limitNum, limitNum] }});
        //const moreMessages = offsetNum + limitNum < (await Discussion.countDocuments({ id: id_room }));

        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }
        res.json({ title: discussion.title, messages: discussion.messages});
    } catch (error) {
        res.json({ error_message: error.message });
    }
};

export const newMessage = async (req, res) => {
    try {
        const { id_room, sender, message, time_stamp } = req.body;

        if (!id_room || !sender || !message || !time_stamp) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const discussion = await Discussion.findOne({ id: id_room });

        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        discussion.messages.push({ sender, message, time_stamp });
        await discussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const newImage = async (req, res) => {
    try {
        const { id_room, sender, image, time_stamp } = req.body;

        if (!id_room || !sender || !image || !time_stamp) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const discussion = await Discussion.findOne({ id: id_room });

        if (!discussion) {
            return res.status(404).json({ error: "Discussion not found" });
        }

        discussion.messages.push({ sender, image, time_stamp });
        await discussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
import Discussion from "../models/Discussion.js";

export const newDiscussion = async (req, res) => {
    try {
        const { title, id, movie } = req.body;
        console.log("movie", movie)
        if(!title || !id || !movie) {
            res.status(400).json({ error_message: "Missing parameters" });
        }

        const newDiscussion = new Discussion({ title, id, movie });
        await newDiscussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
};

export const getDiscussions = async (req, res) => {
    const {movieQuery, sortByDate = 'asc'} = req.query
    const filters = {}
    const sort={}

    if(movieQuery && movieQuery !== "")
    {
        filters.$or = [
            { 'movie.name': movieQuery }, // 1:1 match
            { 'movie.name': { $regex: `^${movieQuery}`, $options: 'i' } }, // Starts with (case-insensitive)
            { 'movie.name': { $regex: movieQuery, $options: 'i' } } // Contained within (case-insensitive)
        ];
    }

    if (sortByDate) {
        sort.date = sortByDate === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending
    }

    console.log(filters);
    try{
        const discussions = await Discussion.find(filters).sort(sort);
        console.log("discussions: ", discussions)
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const pageSize = 50;
        const { id_room, page} = req.query;

        console.log("id_room", id_room);
        console.log("page", page);

        if (!id_room || !page) {
            return res.status(400).json({ error_message: "Missing parameters" });
        }

        //calculate offset and limit to get only 50 messages time by time
        const offsetNum = Number(page)*pageSize;
        const limitNum = Number(page + 1) * pageSize; //slice will exclude last index
        console.log("offsetNum e limitNum", offsetNum, limitNum);

        const discussion = await Discussion.findOne(
            { id: id_room },
            { messages: { $slice: [offsetNum, limitNum] } } // Only fetch requested messages
        );

        const moreMessages = discussion?.messages?.length === pageSize;

        if (!discussion) {
            return res.status(404).json({ error_message: "Discussion not found" });
        }
        console.log("messages: ", discussion?.messages)
        res.json({ title: discussion?.title, movie: discussion?.movie, messages: discussion?.messages, hasMore: moreMessages});
    } catch (error) {
        res.json({ error_message: error.message });
    }
};

export const newMessage = async (req, res) => {
    try {
        const { id_room, sender, message, time_stamp } = req.body;

        if (!id_room || !sender || !message || !time_stamp) {
            return res.status(400).json({ error_message: "Missing required fields" });
        }

        const discussion = await Discussion.findOne({ id: id_room });

        if (!discussion) {
            return res.status(404).json({ error_message: "Discussion not found" });
        }

        discussion.messages.unshift({ sender, message, time_stamp }); //appends to the start of the array
        await discussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}


export const newImage = async (req, res) => {
    try {
        const { id_room, sender, image, time_stamp } = req.body;

        if (!id_room || !sender || !image || !time_stamp) {
            return res.status(400).json({ error_message: "Missing required fields" });
        }

        const discussion = await Discussion.findOne({ id: id_room });

        if (!discussion) {
            return res.status(404).json({ error_message: "Discussion not found" });
        }

        discussion.messages.unshift({ sender, image, time_stamp }); //appends to the start of the array
        await discussion.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
}
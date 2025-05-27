import Discussion from "../models/Discussion.js";

/**
 * Creates a new discussion thread.
 *
 * @route POST /discussions
 * @param {Object} req - Express request object
 * @param {string} req.body.title - The title of the discussion
 * @param {string} req.body.id - Unique identifier for the discussion
 * @param {Object} req.body.movie - The movie related to the discussion
 * @param {Object} res - Express response object
 *
 * @returns {Object} 500 - Internal server error with error_message
 * @returns {Object} 400 - Missing required fields error with error_message
 */
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

/**
 * Retrieves a list of discussions with optional filtering by movie name and sorting by date.
 *
 * @route GET /discussions
 * @param {string} [req.query.movieQuery] - Optional movie title filter
 * @param {string} [req.query.sortByDate='asc'] - Sort order: 'asc' or 'desc'
 *
 * @returns {Array<Discussion>} 200 - An array of discussion objects
 * @returns {Object} 500 - Internal server error with error_message
 */
export const getDiscussions = async (req, res) => {
    const {movieQuery, sortByDate = 'asc'} = req.query
    const filters = {}
    const sort={}

    if(movieQuery && movieQuery !== "") //if title movie specified apply it in the pipeline
    {
        filters.$or = [
            { 'movie.name': movieQuery }, // 1:1 match
            { 'movie.name': { $regex: `^${movieQuery}`, $options: 'i' } }, // Starts with (case-insensitive)
            { 'movie.name': { $regex: movieQuery, $options: 'i' } } // Contained within (case-insensitive)
        ];
    }

    if (sortByDate) { //if sorting specified
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
/**
 * Retrieves paginated messages from a specific discussion thread.
 *
 * @route GET /discussions/messages
 * @param {string} req.query.id_room - ID of the discussion
 * @param {number} req.query.page - Page number for pagination
 * @param {Object} res - Express response object
 *
 * @returns {Object} res Response object
 * @returns {string} res.title - Title of the discussion
 * @returns {movieSchema} res.movie - Movie object associated with the discussion
 * @returns {Array<messageSchema>} res.messages - Array of discussion messages
 * @returns {boolean} res.hasMore - Whether more messages are available
 *
 * @returns {Object} 500 - Internal server error with error_message
 * @returns {Object} 404 - Not message with error_message
 *  */
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

        const discussion = await Discussion.findOne( //query the db
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

/**
 * Adds a new text message to an existing discussion thread.
 *
 * @route POST /discussions/message
 * @param {Object} req - Express request object
 * @param {string} req.body.id_room - ID of the discussion
 * @param {string} req.body.sender - Sender's username
 * @param {string} req.body.message - Message content
 * @param {string} req.body.time_stamp - ISO timestamp
 * @param {Object} res - 200 Express response object
 *
 * @returns {Object} 500 - Internal server error with error_message
 * @returns {Object} 400 - Missing required fields error with error_message
 * @returns {Object} 404 - Discussion not found
 */
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

/**
 * Adds a new image message to an existing discussion thread.
 *
 * @route POST /discussions/image
 * @param {Object} req - Express request object
 * @param {string} req.body.id_room - ID of the discussion
 * @param {string} req.body.sender - Sender's username
 * @param {string} req.body.image - Image data (base64 encoded string)
 * @param {string} req.body.time_stamp - ISO timestamp
 * @param {Object} res - Express response object
 *
 * @returns {Object} 500 - Internal server error with error_message
 * @returns {Object} 400 - Missing required fields error with error_message
 * @returns {Object} 404 - Discussion not found
 */
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
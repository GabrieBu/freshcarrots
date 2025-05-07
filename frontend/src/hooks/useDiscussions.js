import axios from 'axios'
import { useEffect, useState } from 'react'

/*
* Hook used to get discussions of community from MongoDb
* */

export default function useDiscussions() {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        //gets list of discussion in mongodb
        axios({
            method: "GET",
            url: `http://localhost:3000/getDiscussions`,
        })
            .then((res) => {
                setDiscussions(res.data); //set results to the local state and returns it to the component DiscussionList
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { discussions, setDiscussions, loading, error };
}
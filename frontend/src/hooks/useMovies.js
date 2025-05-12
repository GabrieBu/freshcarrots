import axios from "axios";
import { useEffect, useState, useRef } from "react";

/*
* Hook used to get movies for Discover page, returns movies filtered (query Springboot paginated with specifications)
* */

export default function useMovies(pageNumber, selectedFilters) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const prevFiltersRef = useRef([]);

  useEffect(() => {
    // convert filters to a string key for comparison
    const currentFiltersKey = JSON.stringify(selectedFilters);
    const prevFiltersKey = JSON.stringify(prevFiltersRef.current);

    const isFilterChanged = currentFiltersKey !== prevFiltersKey;
    prevFiltersRef.current = selectedFilters;

    setLoading(true);
    let filter = {};

    //update filters to send it to the express server
    selectedFilters.forEach((item) => {
      if (item?.value === "ascName") filter.orderByName = "asc";
      if (item?.value === "descName") filter.orderByName = "desc";
      if (item?.value === "ascDate") filter.orderByDate = "asc";
      if (item?.value === "descDate") filter.orderByDate = "desc";
      if (
          [
            "zeroToOne",
            "oneToTwo",
            "twoToThree",
            "threeToFour",
            "fourToFive",
          ].includes(item?.value)
      ) {
        filter.byRating = item?.value;
      }
      if (!filter.byRating && !filter.orderByName && !filter.orderByDate) {
        filter.genre = item?.value;
      }
    });

    filter = { ...filter, page: pageNumber };
    setError(false);

    axios({
      method: "GET",
      url: `http://localhost:3000/getFilteredMovies`,
      params: filter,
    })
        .then((res) => {
          if (isFilterChanged || pageNumber === 0) {
            setMovies(res.data); // reset list
          } else {
            setMovies((prevMovies) => [...prevMovies, ...res.data]); //update list just page number changed -> infinite scroll triggered case
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
  }, [pageNumber, selectedFilters]);

  return { movies, loadingMovies: loading, errorMovies: error };
}

import axios from "axios";
import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to fetch a list of movies based on pagination and selected filters.
 *
 * This hook sends a GET request to the `/getFilteredMovies` endpoint using the filters
 * such as genre, rating range, and sorting order. It supports infinite scrolling by appending results
 * when only the page number changes, and resets the movie list when filters change.
 *
 * @function useMovies
 * @param {number} pageNumber - The current page number for pagination (0-based).
 * @param {Array} selectedFilters - Array of selected filter objects with a `value` key.
 *  Possible values include:
 *    - Sorting: `"ascName"`, `"descName"`, `"ascDate"`, `"descDate"`
 *    - Ratings: `"zeroToOne"`, `"oneToTwo"`, `"twoToThree"`, `"threeToFour"`, `"fourToFive"`
 *    - Genres: any other string assumed to represent a genre.
 *
 * @returns {Object} An object containing:
 * - {Array} movies - The list of movie objects fetched from the API.
 * - {boolean} loadingMovies - Whether the fetch is currently in progress.
 * - {boolean} errorMovies - Whether an error occurred during the fetch.
 *
 * @example
 * const { movies, loadingMovies, errorMovies } = useMovies(0, [
 *   { value: "action" },
 *   { value: "descDate" },
 * ]);
 *
 * @description
 * - Detects changes in selected filters using a ref and resets the list accordingly.
 * - Appends movies if the page number changes but filters stay the same (infinite scroll support).
 * - Handles loading and error states.
 */
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
    console.log("Selected Filters", selectedFilters)
      selectedFilters.forEach((item) => {
          const value = item?.value;

          if (value === "ascName" || value === "descName" || value === "ascDate" || value === "descDate") {
              filter.order = value;
          } else if (
              [
                  "zeroToOne",
                  "oneToTwo",
                  "twoToThree",
                  "threeToFour",
                  "fourToFive",
              ].includes(value)
          ) {
              filter.ratingRange = value;
          } else {
              // fallback: assume it's a genre (because it's neither order nor rating)
              filter.genre = value;
          }
      });

    console.log("Filters:", filter)
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

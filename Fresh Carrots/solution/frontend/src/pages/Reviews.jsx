import { lazy, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useReviews from "../hooks/useReviews.js";

const Loader = lazy(() => import("../ui/Loader"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const Review = lazy(() => import("../components/Review"));

function Reviews() {
  const [pageNumber, setPageNumber] = useState(1); //on first render page = 0, time to time increase it by one
  /*
  * Default values at the mount of component
  * */
  const [criticFilter, setCriticFilter] = useState("all_critics");
  const [typeFilter, setTypeFilter] = useState("all_types");
  const [minDateFilter, setMinDate] = useState("all_dates");
  const [maxDateFilter, setMaxDate] = useState("all_dates");
  const [reviewMovieFilter, setReviewMovieFilter] = useState("");
  const { loading, error, reviews, hasMore } = useReviews(
    pageNumber,
    criticFilter,
    typeFilter,
    minDateFilter,
    maxDateFilter,
    reviewMovieFilter
  );
  // ref for infinite-scroll
  const { ref, inView } = useInView({});

  // when more reviews are available, retrigger the query with the next page of reviews (50 revs)
  useEffect(() => {
    if (inView && hasMore) {
      setPageNumber((pageNumber) => pageNumber + 1); //increase page
    }
  }, [inView, hasMore]);

  useEffect(() => {
    setPageNumber(1); //whenever a filter changes, restore pagination from the start
  }, [
    criticFilter,
    typeFilter,
    minDateFilter,
    maxDateFilter,
    reviewMovieFilter,
  ]);

  /**
   *
   *  Function is called whenever filter about critics change
   *
   * This function changes value of filter about critics in the local state
   *
   * @function handleCriticFilterChange
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.

   * @description
   * - changes value of filter about critics
   */
  const handleCriticFilterChange = (event) => {
    setCriticFilter(event.target.value);
  };

  /**
   *  Function changes value of filter about type of the reviews (Rotten/Fresh)
   *
   * This function changes value of filter about critics
   *
   * @function handleRottenChange
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.

   * @description
   * - Changes value of filter about type of the reviews (Rotten/Fresh)
   */
  const handleRottenChange = (event) => {
    setTypeFilter(event.target.value);
  };

  /**
   *
   *  Function to set filter about date.
   *
   * This function changes value of filter about date
   *
   * @function handleMinDate
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.

   * @description
   * - Will re-trigger the hook to get reviews from event.target.value specified
   * - If max date is earlier than min date switches values
   */
  const handleMinDate = (event) => {
    // invert order of filtering if start date < of end date
    if (
      maxDateFilter &&
      maxDateFilter !== "all_dates" &&
      maxDateFilter < minDateFilter
    ) {
      const temp = maxDateFilter;
      setMaxDate(event.target.value);
      setMinDate(temp);
      return;
    }
    setMinDate(event.target.value);
  };

  /**
   *
   *  Function to set filter about date.
   *
   * This function changes value of filter about date
   *
   * @function handleMaxDate
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.

   * @description
   * - Will re-trigger the hook to get reviews from event.target.value specified
   * - If min date is later than max date switches values
   */
  const handleMaxDate = (event) => {
    // invert order of dates if start date < of end date
    if (
      minDateFilter &&
      minDateFilter !== "all_dates" &&
      maxDateFilter < minDateFilter
    ) {
      const temp = minDateFilter;
      setMinDate(event.target.value);
      setMaxDate(temp);
      return;
    }
    setMaxDate(event.target.value);
  };

  /**
   *
   *  Function to set query for movie title search.
   *
   * This function changes value of local state of query movie title
   *
   * @function handleSearch
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.

   * @description
   * - Will re-trigger the hook to get reviews from event.target.value specified
   */
  const handleSearch = (event) => {
    setReviewMovieFilter(event.target.value);
  };

  /**
   *
   *  Function to clear each filter specified
   *
   * This function clears each filter specified
   *
   * @function handleResetFilters
   *
   * @description
   * - Clears each type of filter in the local storage. Will retrigger automatically hook for reviews
   */
  const handleResetFilters = () => {
    setCriticFilter("all_critics");
    setTypeFilter("all_types");
    setMinDate("all_dates");
    setMaxDate("all_dates");
    setReviewMovieFilter("");
  };

  return (
    <>
      <Navbar />
      {error && (
        <h2 className="text-danger">
          Server is not responding. Try again later...
        </h2>
      )}
      <LayoutContent>
        <h1>Reviews: </h1>
        <div
          className="bg-light p-3 mb-4 shadow-sm rounded"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="row gy-2">
            <div className="col-md-2">
              <label htmlFor="criticFilter" className="form-label">
                Critic:
              </label>
              <select
                id="criticFilter"
                className="form-select"
                value={criticFilter}
                onChange={handleCriticFilterChange}
              >
                <option value="all_critics">All</option>
                <option value="True">Top</option>
                <option value="False">Normal</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="typeFilter" className="form-label">
                Type:
              </label>
              <select
                id="typeFilter"
                className="form-select"
                value={typeFilter}
                onChange={handleRottenChange}
              >
                <option value="all_types">All</option>
                <option value="Rotten">Rotten</option>
                <option value="Fresh">Fresh</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="minDateFilter" className="form-label">
                From date:
              </label>
              <input
                id="minDateFilter"
                type="date"
                className="form-control"
                value={minDateFilter}
                onChange={handleMinDate}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="maxDateFilter" className="form-label">
                To date:
              </label>
              <input
                id="maxDateFilter"
                type="date"
                className="form-control"
                value={maxDateFilter}
                onChange={handleMaxDate}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="ReviewMovieFilter" className="form-label">
                Name movie:
              </label>
              <input
                id="ReviewMovieFilter"
                type="text"
                className="form-control"
                value={reviewMovieFilter}
                placeholder="Search movie title"
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        {reviews?.map((review, index) => {
          return (
            <Review
              review={review}
              key={index}
            />
          );
        })}
      </LayoutContent>
      {/* Loader when infinite-scoll is triggered, finishing to fetch and render */}
      {loading && <Loader />}
      <div ref={ref}></div>
      <Footer />
    </>
  );
}

export default Reviews;

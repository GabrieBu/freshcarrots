package com.example.spring_boot_server.movies.specifications;

import com.example.spring_boot_server.genres.Genre;
import com.example.spring_boot_server.movies.Movie;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;
/**
 * Utility class providing a dynamic {@link Specification} for filtering and sorting {@link Movie} entities
 * based on various criteria such as rating range, genre, and order preferences.
 *
 * This class is used with Spring Data Specification API to build type-safe, dynamic queries.
 */
public class MovieSpecification {
    /**
     * Builds a {@link Specification} for filtering and ordering movies.
     *
     * @param order       Sorting order preference. Accepted values:
     *                        {@code ascDate} - ascending by date
     *                        {@code descDate} - descending by date
     *                        {@code ascName} - ascending by name
     *                        {@code descName} - descending by name
     * @param ratingRange Rating range to filter movies. Accepted values:
     *                        {@code zeroToOne} - ratings between 0.0 and 1.0
     *                        {@code oneToTwo} - ratings between 1.0 and 2.0
     *                        {@code twoToThree} - ratings between 2.0 and 3.0
     *                        {@code threeToFour} - ratings between 3.0 and 4.0
     *                        {@code fourToFive} - ratings between 4.0 and 5.0
     * @param genre       Genre name to filter movies by. If null or empty, no genre filtering is applied.
     *
     * @return A {@link Specification<Movie>} object containing all the filtering and sorting logic
     */
    public static Specification<Movie> filterBy(String order, String ratingRange, String genre) {
        return (Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            List<Order> orderList = new ArrayList<>();

            // Apply genre filter first to ensure join is used correctly
            if (genre != null && !genre.isEmpty()) {
                Join<Movie, Genre> genreJoin = root.join("genres", JoinType.LEFT);
                predicates.add(cb.equal(genreJoin.get("genre"), genre));
            }

            System.out.println(ratingRange);
            // Apply rating filter
            if (ratingRange != null && !ratingRange.isEmpty()) {
                switch (ratingRange) {
                    case "zeroToOne":
                        predicates.add(cb.between(root.get("rating"), 0.0, 1.0));
                        break;
                    case "oneToTwo":
                        predicates.add(cb.between(root.get("rating"), 1.0, 2.0));
                        break;
                    case "twoToThree":
                        predicates.add(cb.between(root.get("rating"), 2.0, 3.0));
                        break;
                    case "threeToFour":
                        predicates.add(cb.between(root.get("rating"), 3.0, 4.0));
                        break;
                    case "fourToFive":
                        predicates.add(cb.between(root.get("rating"), 4.0, 5.0));
                        break;
                }
            }

            if (order != null && !order.isEmpty()) {
                switch (order.toLowerCase()) {
                    case "ascdate":
                        orderList.add(cb.asc(cb.coalesce(root.get("date"), cb.literal(Float.MAX_VALUE))));
                        break;
                    case "descdate":
                        orderList.add(cb.desc(cb.coalesce(root.get("date"), cb.literal(0))));
                        break;
                    case "ascname":
                        orderList.add(cb.asc(cb.lower(root.get("name"))));
                        break;
                    case "descname":
                        orderList.add(cb.desc(cb.lower(root.get("name"))));
                        break;
                }
            }

            // Always sort by rating (desc) as fallback
            orderList.add(cb.desc(cb.coalesce(root.get("rating"), 0.0)));

            // Final fallback to ensure deterministic sort
            orderList.add(cb.asc(root.get("id")));

            // Apply ordering after everything else is done
            query.orderBy(orderList);

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}


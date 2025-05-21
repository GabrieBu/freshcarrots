package com.example.spring_boot_server.movies.specifications;

import com.example.spring_boot_server.genres.Genre;
import com.example.spring_boot_server.movies.Movie;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;

public class MovieSpecification {
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


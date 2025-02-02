package com.example.spring_boot_server.movies.specifications;

import com.example.spring_boot_server.genres.Genre;
import com.example.spring_boot_server.movies.Movie;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;

public class MovieSpecification {
    public static Specification<Movie> filterBy(String orderByName, String orderByDate, String byRating, String genre) {
        return (Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (orderByDate != null && !orderByDate.isEmpty()) {
                if (orderByDate.equalsIgnoreCase("desc")) {
                    query.orderBy(cb.desc(cb.coalesce(root.get("date"), 0)));
                } else if (orderByDate.equalsIgnoreCase("asc")) {
                    query.orderBy(cb.asc(cb.coalesce(root.get("date"), Double.MAX_VALUE)));
                }
            }

            if (orderByName != null && !orderByName.isEmpty()) {
                if (orderByName.equalsIgnoreCase("desc")) {
                    query.orderBy(cb.desc(root.get("name")));
                } else if (orderByName.equalsIgnoreCase("asc")) {
                    query.orderBy(cb.asc(root.get("name")));
                }
            }

            if (byRating != null && !byRating.isEmpty()) {
                switch (byRating) {
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

            if(genre!= null && !genre.isEmpty()){
                Join<Movie, Genre> genreJoin = root.join("genres", JoinType.LEFT);
                predicates.add(cb.equal(genreJoin.get("genre"), genre));
            }

            if (!predicates.isEmpty()) {
                query.where(cb.and(predicates.toArray(new Predicate[0])));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

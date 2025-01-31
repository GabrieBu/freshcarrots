package com.example.spring_boot_server.releases;
import com.example.spring_boot_server.movies.Movie;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="releases")
public class Release {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "country", columnDefinition = "TEXT")
    private String country;
    @Column(name = "date", columnDefinition = "TIMESTAMP")
    private LocalDateTime date;
    @Column(name = "type", columnDefinition = "TEXT")
    private String type;
    @Column(name = "age_min", columnDefinition = "INTEGER")
    private Integer age_min;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false, columnDefinition = "BIGINT")
    private Movie movie;

    public Release() {}

    public Release(String country, LocalDateTime date, String type, Integer age_min,Movie movie) {
        this.movie = movie;
        this.country = country;
        this.date = date;
        this.type = type;
        this.age_min = age_min;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getAge_min() {
        return age_min;
    }

    public void setAge_min(Integer age_min) {
        this.age_min = age_min;
    }
}

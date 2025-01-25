package com.example.spring_boot_server.releases;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table
public class Release {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_film", nullable = false, columnDefinition = "BIGINT")
    private Long id_film;
    @Column(name = "country", columnDefinition = "TEXT")
    private String country;
    @Column(name = "date", columnDefinition = "TIMESTAMP")
    private LocalDateTime date;
    @Column(name = "type", columnDefinition = "TEXT")
    private String type;
    @Column(name = "age_min", columnDefinition = "INTEGER")
    private Integer age_min;


    public Release() {}

    public Release(Long id_film, String country, LocalDateTime date, String type, Integer age_min) {
        this.id_film = id_film;
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

    public Long getId_film() {
        return id_film;
    }

    public void setId_film(Long id_film) {
        this.id_film = id_film;
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

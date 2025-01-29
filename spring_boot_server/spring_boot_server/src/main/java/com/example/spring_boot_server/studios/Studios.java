package com.example.spring_boot_server.studios;
import com.example.spring_boot_server.movies.Movie;
import jakarta.persistence.*;

@Entity
@Table(name="studios")
public class Studios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "studio", columnDefinition = "TEXT")
    private String studio;
    @ManyToOne
    @JoinColumn(name = "id_film", referencedColumnName = "id", nullable = false)
    private Movie movie;

    public Studios() {}

    public Studios(Long id_, String studio, Movie movie) {
        this.id = id_;
        this.studio = studio;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudio() {
        return studio;
    }

    public void setStudio(String studio) {
        this.studio = studio;
    }
}

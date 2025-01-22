package com.example.spring_boot_server.actors;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Actors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "full_name", nullable = false, columnDefinition = "TEXT")
    private String name; // Renamed to full_name in the database, mapped to TEXT type
    @Column(name = "last_name", nullable = false, columnDefinition = "TEXT")
    private String surname; // Renamed to last_name in the database, mapped to TEXT type
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dob; // Maps to a DATE type in the database
    @Column(unique = true, nullable = false) // Define email as unique and non-null
    private String email;
    // Constructors, getters, setters, other methods...

}

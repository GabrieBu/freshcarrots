package com.example.spring_boot_server.actors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActorsService {
    private final ActorsRepository actorsRepository;
    @Autowired
    public ActorsService(ActorsRepository actorsRepository) {
        this.actorsRepository = actorsRepository;
    }


    public List<Actors> findActorsByName(String name) {
        return actorsRepository.findActorsByNameCustomQuery(name);
    }

    public Optional<Actors> findActorsByMovie(String name) {
        return actorsRepository.findByMovie(name);
    }
}

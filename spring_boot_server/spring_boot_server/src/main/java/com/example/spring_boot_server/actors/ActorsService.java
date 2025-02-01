package com.example.spring_boot_server.actors;
import com.example.spring_boot_server.actors.dtos.ActorNameDTO;
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


    public List<ActorNameDTO> findActorsByName(String name) {
        return actorsRepository.findActorsByName(name);
    }

    public List<ActorNameDTO> findtest() {
        return actorsRepository.findTest();
    }
}

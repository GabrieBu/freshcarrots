package com.example.spring_boot_server.releases;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReleasesService {
    private final ReleasesRepository releasesRepository;

    @Autowired
    public ReleasesService(ReleasesRepository releasesRepository) {this.releasesRepository = releasesRepository;}

    public List<Release> findReleaseByMovie(Integer movieId) {return  releasesRepository.findByMovie(movieId);}
}

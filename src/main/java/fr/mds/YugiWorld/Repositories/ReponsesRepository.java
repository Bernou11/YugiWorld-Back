package fr.mds.YugiWorld.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.mds.YugiWorld.Entities.ReponsesEntity;

@Repository
public interface ReponsesRepository extends JpaRepository<ReponsesEntity, Integer> {
    
}

package fr.mds.YugiWorld.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.mds.YugiWorld.Entities.QuestionsEntity;

public interface QuestionsRepository extends JpaRepository<QuestionsEntity, Integer> {

}

package fr.mds.YugiWorld.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Entities.ReponsesEntity;

public interface QuestionsRepository extends JpaRepository<QuestionsEntity, Integer>{
    @Query(nativeQuery=true, value="SELECT q.* FROM QuestionsEntity q, ReponsesEntity r WHERE r.question.id = q.id")
    List<ReponsesEntity> findByReponsesId(List<Integer> reponsesId);
}

package fr.mds.YugiWorld.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Entities.ReponsesEntity;

public interface QuestionsRepository extends JpaRepository<QuestionsEntity, Integer> {
    @Query(nativeQuery=true, value="SELECT q.id, q.question, r.id, r.reponses FROM QuestionsEntity q, ReponsesEntity r WHERE r.question_id = :question_id")
    List<ReponsesEntity> findByReponsesId(@Param("question_id") int questionId);
}

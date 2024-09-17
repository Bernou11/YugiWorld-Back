package fr.mds.YugiWorld.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import fr.mds.YugiWorld.Entities.ReponsesEntity;

public interface ReponsesRepository extends JpaRepository<ReponsesEntity, Integer> {
    @Query(nativeQuery=true, value="select q.question from QuestionsEntity q, ReponsesEntity r where r.question.id = :questionId")
    List<ReponsesEntity> getReponsesByQuestionId(@Param("questionId") int questionId);
}

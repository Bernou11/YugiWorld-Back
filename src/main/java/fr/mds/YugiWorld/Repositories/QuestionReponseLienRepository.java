package fr.mds.YugiWorld.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.mds.YugiWorld.Entities.QuestionReponseLienEntity;

public interface QuestionReponseLienRepository extends JpaRepository<QuestionReponseLienEntity, Long> {
    List<QuestionReponseLienEntity> findByQuestionId(int questionId);
}

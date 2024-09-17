package fr.mds.YugiWorld.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Entities.ReponsesEntity;
import fr.mds.YugiWorld.Repositories.QuestionsRepository;
import fr.mds.YugiWorld.Repositories.ReponsesRepository;

@Service
public class ReponsesService {
    @Autowired
    private ReponsesRepository reponseRepository;

    @Autowired
    private QuestionsRepository questionRepository;

    public ReponsesEntity createReponse(int questionId, String reponseText) {
        QuestionsEntity question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Question non trouvée"));
        ReponsesEntity reponse = new ReponsesEntity();
        reponse.setReponses(reponseText);
        reponse.setNombre_reponses(0);
        reponse.setQuestion(question);
        return reponseRepository.save(reponse);
    }

    public List<ReponsesEntity> getAllReponses() {
        return reponseRepository.findAll();
    }

    public List<ReponsesEntity> getReponseByQuestionId(int questionId) {
        return reponseRepository.getReponsesByQuestionId(questionId);
    }
}

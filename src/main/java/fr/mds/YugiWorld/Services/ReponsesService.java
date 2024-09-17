package fr.mds.YugiWorld.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.mds.YugiWorld.Entities.QuestionReponseLienEntity;
import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Entities.ReponsesEntity;
import fr.mds.YugiWorld.Repositories.QuestionReponseLienRepository;
import fr.mds.YugiWorld.Repositories.QuestionsRepository;
import fr.mds.YugiWorld.Repositories.ReponsesRepository;

@Service
public class ReponsesService {
    @Autowired
    private ReponsesRepository reponseRepository;

    @Autowired
    private QuestionsRepository questionRepository;

    @Autowired
    private QuestionReponseLienRepository questionReponseLienRepository;

    public ReponsesEntity createReponse(int questionId, String reponseText, int nombreReponses) {
        QuestionsEntity question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Question non trouvée"));
        ReponsesEntity reponse = new ReponsesEntity();
        reponse.setReponses(reponseText);
        reponse.setNombre_reponses(nombreReponses);
        reponse.setQuestion(question);
        return reponseRepository.save(reponse);
    }

    public QuestionReponseLienEntity lierReponses(int questionId, int reponse1Id, int reponse2Id) {
        QuestionsEntity question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("La question n'a pas été trouvée"));
        ReponsesEntity reponse1 = reponseRepository.findById(reponse1Id).orElseThrow(() -> new IllegalArgumentException("La première réponse n'a pas été trouvée"));
        ReponsesEntity reponse2 = reponseRepository.findById(reponse2Id).orElseThrow(() -> new IllegalArgumentException("La deuxième réponse n'a pas été trouvée"));

        QuestionReponseLienEntity lien = new QuestionReponseLienEntity();
        lien.setQuestion(question);
        lien.setReponse1(reponse1);
        lien.setReponse2(reponse2);

        return questionReponseLienRepository.save(lien);
    }

    public List<ReponsesEntity> getAllReponses() {
        return reponseRepository.findAll();
    }

    public List<ReponsesEntity> getReponseByQuestionId(int questionId) {
        return reponseRepository.getReponsesByQuestionId(questionId);
    }
}

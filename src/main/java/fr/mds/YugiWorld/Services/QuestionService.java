package fr.mds.YugiWorld.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.mds.YugiWorld.Entities.QuestionReponseLienEntity;
import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Entities.ReponsesEntity;
import fr.mds.YugiWorld.Repositories.QuestionReponseLienRepository;
import fr.mds.YugiWorld.Repositories.QuestionsRepository;
import java.util.ArrayList;

@Service
public class QuestionService {

    @Autowired
    private QuestionsRepository questionRepository;

    @Autowired
    private QuestionReponseLienRepository questionReponseLienRepository;

    public QuestionsEntity createQuestion(String questionText) {
        QuestionsEntity question = new QuestionsEntity();
        question.setQuestion(questionText);
        return questionRepository.save(question);
    }

    public List<ReponsesEntity> getLinkedReponses(int questionId) {
        List<QuestionReponseLienEntity> liens = questionReponseLienRepository.findByQuestionId(questionId);

        List<ReponsesEntity> reponsesLiees = new ArrayList<>();
        for (QuestionReponseLienEntity lien : liens) {
            reponsesLiees.add(lien.getReponse1()); 
            reponsesLiees.add(lien.getReponse2());        
        }
        return reponsesLiees;
    }

    public List<QuestionsEntity> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<QuestionsEntity> getQuestionById(int id) {
        return questionRepository.findById(id);
    }
}

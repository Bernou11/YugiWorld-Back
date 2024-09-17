package fr.mds.YugiWorld.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.mds.YugiWorld.Entities.QuestionsEntity;
import fr.mds.YugiWorld.Repositories.QuestionsRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionsRepository questionRepository;

    public QuestionsEntity createQuestion(String questionText) {
        QuestionsEntity question = new QuestionsEntity();
        question.setQuestion(questionText);
        return questionRepository.save(question);
    }

    public List<QuestionsEntity> findAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<QuestionsEntity> getQuestionById(int id) {
        return questionRepository.findById(id);
    }
}

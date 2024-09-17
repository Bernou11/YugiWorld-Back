package fr.mds.YugiWorld.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "questions_reponses_liens")
@Getter
@Setter
public class QuestionReponseLienEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "questions_id", nullable = false)
    private QuestionsEntity question;

    @ManyToOne
    @JoinColumn(name = "reponse1_id", nullable = false)
    private ReponsesEntity reponse1;

    @ManyToOne
    @JoinColumn(name = "reponse2_id", nullable = false)
    private ReponsesEntity reponse2;

    // Getters and Setters
}

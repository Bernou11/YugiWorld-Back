package fr.mds.YugiWorld.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name="reponses", schema="mydb")
public class ReponsesEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="id", nullable=false)
    private int id;

    @Column(name="reponses", nullable=false)
    private String reponses;

    @Column(name="nombre_reponses", nullable=false)
    private long nombre_reponses;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="questions_id")
    private QuestionsEntity question;
}

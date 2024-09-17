package fr.mds.YugiWorld.Entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name="questions", schema="mydb")
public class QuestionsEntity {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id", nullable=false)
    private int id;

    @Column(name="question", nullable=false)
    private String question;

    @OneToMany(fetch=FetchType.LAZY, mappedBy="reponses")
    private List<ReponsesEntity> reponses;
}

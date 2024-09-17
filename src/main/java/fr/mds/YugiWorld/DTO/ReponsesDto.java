package fr.mds.YugiWorld.DTO;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class ReponsesDto {
    private String reponse;

    private long nombreReponses;

    private int questionId;
}

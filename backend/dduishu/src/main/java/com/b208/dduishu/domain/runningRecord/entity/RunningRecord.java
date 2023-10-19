package com.b208.dduishu.domain.runningRecord.entity;

import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.character.entity.Character;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class RunningRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "running_record_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "character_id")
    private Character character;

    @Enumerated(EnumType.STRING)
    private RunningType type;

    @OneToOne
    @JoinColumn(name = "rival_record_id")
    private RunningRecord rivalRecord;

    private int totalTime;

    private int totalDistance;

    private int averageSpeed;

    private int averageCalory;

    private LocalDateTime createdAt;


}

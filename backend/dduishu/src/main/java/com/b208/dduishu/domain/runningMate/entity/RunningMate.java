package com.b208.dduishu.domain.runningMate.entity;

import com.b208.dduishu.domain.runningRecord.entity.RunningRecord;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
public class RunningMate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "running_mate_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "running_record_id")
    private RunningRecord runningRecord;

    private LocalDateTime createdAt;

}

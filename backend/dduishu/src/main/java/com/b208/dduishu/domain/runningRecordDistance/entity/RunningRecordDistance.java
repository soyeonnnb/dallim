package com.b208.dduishu.domain.runningRecordDistance.entity;

import com.b208.dduishu.domain.runningRecord.entity.RunningRecord;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RunningRecordDistance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "running_record_distance_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "running_record_id")
    private RunningRecord runningRecord;

    private int second;

    private int distance;
}

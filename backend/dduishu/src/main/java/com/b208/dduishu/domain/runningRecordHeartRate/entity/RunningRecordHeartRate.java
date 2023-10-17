package com.b208.dduishu.domain.runningRecordHeartRate.entity;

import com.b208.dduishu.domain.runningRecord.entity.RunningRecord;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RunningRecordHeartRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "heart_rate_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "running_record_id")
    private RunningRecord runningRecord;

    private int second;

    private int heartRate;
}

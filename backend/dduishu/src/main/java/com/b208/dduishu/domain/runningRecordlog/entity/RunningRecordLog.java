package com.b208.dduishu.domain.runningRecordlog.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "running_record_log")
@NoArgsConstructor
public class RunningRecordLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "running_record_log_id")
    private Long id;

    private String runningRecordId;

    private long executeTime;

    @Builder
    public RunningRecordLog(Long id, String runningRecordId, long executeTime) {
        this.id = id;
        this.runningRecordId = runningRecordId;
        this.executeTime = executeTime;
    }
}

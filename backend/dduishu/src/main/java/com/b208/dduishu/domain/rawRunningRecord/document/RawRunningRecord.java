package com.b208.dduishu.domain.rawRunningRecord.document;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "rawRunningRecord")
@ToString
public class RawRunningRecord {

    @Id
    private ObjectId id;

    private String runningRecordId;

    private List<Double> runningRecordInfos;

    private double averagePace;

    private int totalTime;

    @Builder
    public RawRunningRecord(ObjectId id, String runningRecordId, List<Double> runningRecordInfos, double averagePace, int totalTime) {
        this.id = id;
        this.runningRecordId = runningRecordId;
        this.runningRecordInfos = runningRecordInfos;
        this.averagePace = averagePace;
        this.totalTime = totalTime;
    }
}

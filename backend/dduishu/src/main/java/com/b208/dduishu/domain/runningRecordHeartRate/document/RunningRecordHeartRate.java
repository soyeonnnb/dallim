package com.b208.dduishu.domain.runningRecordHeartRate.document;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Document(collection = "runningRecordHeartRate")
@ToString
public class RunningRecordHeartRate {

    @Id
    private ObjectId id;
    private int second;
    private int heartRate;

    @Builder
    public RunningRecordHeartRate(int second, int heartRate) {
        this.second = second;
        this.heartRate = heartRate;
    }

}

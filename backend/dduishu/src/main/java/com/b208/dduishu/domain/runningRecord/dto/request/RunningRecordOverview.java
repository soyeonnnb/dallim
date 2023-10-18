package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Data;
import lombok.Getter;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordOverview {

    private ObjectId id;
    private RunningType type;
    private int totalTime;
    private int totalDistance;
    private int averageSpeed;
    private int averageCalory;
    private LocalDateTime createdAt;

    public RunningRecordOverview(RunningRecord runningRecord) {
        this.id = runningRecord.getId();
        this.type = runningRecord.getType();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.averageCalory = runningRecord.getAverageCalory();
        this.createdAt = runningRecord.getCreatedAt();
    }

}

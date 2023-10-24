package com.b208.dduishu.domain.runningRecord.document;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDistanceInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordHeartRateInfo;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "runningRecord")
@ToString
public class RunningRecord {

    @Id
    private ObjectId id;
    private UserInfo user;
    private CharacterInfo character;
    private RunningType type;
    private RivalRunningRecordInfo rivalRecord;
    private List<RunningRecordDistanceInfo> runningRecordDistanceInfos;
    private List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos;

    private int totalTime;
    private int totalDistance;
    private int averageSpeed;
    private int averageCalorie;
    private LocalDateTime createdAt;

    @Builder
    public RunningRecord(UserInfo user, CharacterInfo character, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordDistanceInfo> runningRecordDistanceInfos, List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos,int totalTime, int totalDistance, int averageSpeed, int averageCalorie) {
        this.user = user;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordDistanceInfos = runningRecordDistanceInfos;
        this.runningRecordHeartRateInfos = runningRecordHeartRateInfos;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.averageSpeed = averageSpeed;
        this.averageCalorie = averageCalorie;
        this.createdAt = LocalDateTime.now();
    }
}

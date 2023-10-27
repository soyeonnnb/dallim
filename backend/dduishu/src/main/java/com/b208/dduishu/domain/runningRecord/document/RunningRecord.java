package com.b208.dduishu.domain.runningRecord.document;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDistanceInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordHeartRateInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverallInfo;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
    private CharacterOverview character;
    private RunningType type;
    private RivalRunningRecordInfo rivalRecord;
    private List<RunningRecordOverallInfo> runningRecordInfos;

    private float stepCount;
    private String averagePace;
    private int totalTime;
    private float totalDistance;
    private float averageSpeed;
    private float averageHeartRate;
    private LocalDateTime createdAt;
    private String formattedDate;

    @Builder
    public RunningRecord(UserInfo user, CharacterOverview character, Date createdAt, float stepCount, String averagePace, float averageHeartRate, String formattedDate, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, float totalDistance, float averageSpeed) {
        this.user = user;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordInfos = runningRecordInfos;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.stepCount = stepCount;
        this.averagePace = averagePace;
        this.averageHeartRate = averageHeartRate;
        this.formattedDate = formattedDate;
        this.averageSpeed = averageSpeed;
        this.createdAt = toLocalDateTime(createdAt);
    }

    private static LocalDateTime toLocalDateTime(Date date) {
        // Date를 LocalDateTime으로 변환 (서울 시간대)
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toLocalDateTime();

        return localDateTime;
    }
}

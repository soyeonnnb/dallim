package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.runningRecordDistance.document.RunningRecordDistance;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.character.entity.Character;
import lombok.Data;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordInfo {

    private Long userId;
    private Long characterId;
    private RunningType type;
    private ObjectId rivalRecordId;

    private List<RunningRecordDistanceInfo> runningRecordDistanceInfoList;

    public RunningRecord toRunningRecord(User user, Character character, RunningRecord rivalRecord){
        return RunningRecord.builder()
                .user(user)
                .character(character)
                .type(this.type)
                .rivalRecord(rivalRecord)
                .totalTime(0)
                .totalDistance(0)
                .averageSpeed(0)
                .averageCalory(0)
                .build();
    }

    public RunningRecordDistance toRunningRecordDistance() {



        return RunningRecordDistance.builder().second()build();
    }
}

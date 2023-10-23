package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.runningRecordDistance.document.RunningRecordDistance;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
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

    private List<RunningRecordDistanceInfo> runningRecordDistanceInfos;
    private List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos;

    public RunningRecord toRunningRecord(User user, Character character, RunningRecord rivalRecord){

        UserInfo userInfo = new UserInfo(user);
        CharacterInfo characterInfo = new CharacterInfo(character);
        RivalRunningRecordInfo rivalRunningRecordInfo = null;
        if (rivalRecord != null) {
            rivalRunningRecordInfo = new RivalRunningRecordInfo(rivalRecord);
        }
        return RunningRecord.builder()
                .user(userInfo)
                .character(characterInfo)
                .type(this.type)
                .rivalRecord(rivalRunningRecordInfo)
                .runningRecordDistanceInfos(this.runningRecordDistanceInfos)
                .runningRecordHeartRateInfos(this.runningRecordHeartRateInfos)
                .totalTime(10)
                .totalDistance(100)
                .averageSpeed(0)
                .averageCalory(0)
                .build();
    }
}

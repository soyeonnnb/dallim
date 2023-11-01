package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.character.entity.Character;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

@Data
public class RunningRecordInfo {

    private Long userId;
    private Date date;
    private String formattedDate;
    private Long characterId;
    private RunningType type;
    private ObjectId rivalRecordId;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private double averageHeartRate;
    private String averagePace;
    private double stepCount;
    //러닝 데이터 받아오기
    // 운동일시, 총 시간, 평균 속력, 이동 거리, 평균 심박수
    // + 위치정보
    // + 생체정보 +a
    private List<RunningRecordOverallInfo> runningRecordInfos;

    public RunningRecord toRunningRecord(User user, Planet planet, Character character, RunningRecord rivalRecord){

        UserInfo userInfo = new UserInfo(user);
        CharacterRecordInfo characterInfo = new CharacterRecordInfo(character, planet);
        RivalRunningRecordInfo rivalRunningRecordInfo = null;
        if (rivalRecord != null) {
            rivalRunningRecordInfo = new RivalRunningRecordInfo(rivalRecord);
        }

        RunningRecord build = RunningRecord.builder()
                .user(userInfo)
                .character(characterInfo)
                .type(this.type)
                .rivalRecord(rivalRunningRecordInfo)
                .runningRecordInfos(this.runningRecordInfos)
                .totalTime(this.totalTime)
                .totalDistance(this.totalDistance)
                .averageSpeed(this.averageSpeed)
                .averagePace(this.averagePace)
                .averageHeartRate(this.averageHeartRate)
                .createdAt(this.date)
                .formattedDate(this.formattedDate)
                .stepCount(this.stepCount)
                .build();

        return build;
    }
}

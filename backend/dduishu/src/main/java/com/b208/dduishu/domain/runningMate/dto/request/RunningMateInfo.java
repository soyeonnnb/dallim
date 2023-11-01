package com.b208.dduishu.domain.runningMate.dto.request;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.util.Util;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RunningMateInfo {

    private Long userId;
    private String nickName;
    private int characterIndex;
    private int planetIndex;
    private int level;
    private double averageSpeed;
    private double totalDistance;
    private double totalTime;
    private boolean isClear;
    private LocalDateTime createdAt;

    @Builder
    public RunningMateInfo(RunningMate runningMate) {
        this.userId = runningMate.getRivalRecord().getUser().getUserId();
        this.nickName = runningMate.getRivalRecord().getUser().getNickname();
        this.characterIndex = runningMate.getRivalRecord().getCharacter().getCharacterIndex();
        this.planetIndex = runningMate.getRivalRecord().getCharacter().getPlanetIndex();
        this.level = runningMate.getRivalRecord().getUser().getLevel();
        this.averageSpeed = runningMate.getRivalRecord().getAverageSpeed();
        this.totalDistance = runningMate.getRivalRecord().getTotalDistance();
        this.totalTime = runningMate.getRivalRecord().getTotalTime() * 60;
        this.isClear = false;
        this.createdAt = runningMate.getCreatedAt();
    }
}

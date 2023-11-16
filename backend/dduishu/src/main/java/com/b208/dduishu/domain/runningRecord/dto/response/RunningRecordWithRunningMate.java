package com.b208.dduishu.domain.runningRecord.dto.response;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.document.WinOrLose;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
public class RunningRecordWithRunningMate {

    private String id;
    private int characterIndex;
    private int evolutionStage;
    private WinOrLose winOrLose;
    private LocalDateTime createdAt;
    private List<Double> mySpeed;
    private List<Double> rivalSpeed;
    private int totalTime;
    private double totalDistance;
    private double rivalTotalDistance;
    private double averageHeartRate;

    public RunningRecordWithRunningMate(RunningRecord runningRecord, RunningRecord rivalRecord) {
        this.id = runningRecord.getId().toString();
        this.characterIndex = runningRecord.getCharacter().getCharacterIndex();
        this.evolutionStage = runningRecord.getCharacter().getEvolutionStage();
        this.winOrLose = runningRecord.getWinOrLose();
        this.mySpeed = getSpeed(runningRecord);
        this.rivalSpeed = getSpeed(rivalRecord);
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.rivalTotalDistance = rivalRecord.getTotalDistance();
        this.averageHeartRate = runningRecord.getAverageHeartRate();
        this.createdAt = runningRecord.getCreatedAt();
    }

    public List<Double> getSpeed(RunningRecord runningRecord) {
        return runningRecord.getRunningRecordInfos().stream()
                .map(o -> o.getSpeed())
                .collect(toList());
    }
}

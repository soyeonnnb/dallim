package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.runningRecord.document.*;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RivalRunningRecordInfo {

    private String id;
    private String location;
    private PaceInfo pace;
    private UserInfo user;
    private CharacterRecordInfo character;
    private RunningType type;
    private List<RunningRecordOverallInfo> runningRecordInfos;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private double averagePace;
    private LocalDateTime createdAt;
    private WinOrLose winOrLose;

    @Builder
    public RivalRunningRecordInfo(RunningRecord runningRecord) {
        this.id = runningRecord.getId().toString();
        this.user = runningRecord.getUser();
        this.location = runningRecord.getLocation();
        this.character = runningRecord.getCharacter();
        this.type = runningRecord.getType();
        this.runningRecordInfos = runningRecord.getRunningRecordInfos();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.averagePace = runningRecord.getAveragePace();
        this.createdAt = runningRecord.getCreatedAt();
        this.winOrLose = runningRecord.getWinOrLose();
    }

    public void setPace(List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, double totalDistance) {
        this.pace = getPaceInfo(runningRecordInfos, totalTime, totalDistance);
    }

    public PaceInfo getPaceInfo(List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, double totalDistance) {
        List<PaceSectionInfo> sectionPaces = new ArrayList<>();
        PaceSectionInfo currentSection = new PaceSectionInfo();
        double nextSectionDistance = 1000.0; // 다음 구간까지의 거리

        for (RunningRecordOverallInfo record : runningRecordInfos) {
            double currentDistance = record.getDistance();

            if (currentDistance >= nextSectionDistance) {
                // 현재 레코드가 새로운 구간의 끝을 나타냄
                currentSection.setFinishTime(record.getSecond());
                currentSection.setPace(currentSection.getFinishTime() - currentSection.getStartTime());
                sectionPaces.add(currentSection);

                // 새로운 구간을 시작
                currentSection = new PaceSectionInfo();
                currentSection.setStartTime(record.getSecond());

                // 다음 구간 거리 업데이트
                nextSectionDistance += 1000.0;
            }
        }

        // 마지막 구간 추가 (스트림이 끝났을 때 마지막 구간을 처리)
        if (currentSection.getStartTime() != runningRecordInfos.get(runningRecordInfos.size() - 1).getSecond()) {
            RunningRecordOverallInfo lastRecord = runningRecordInfos.get(runningRecordInfos.size() - 1);

            currentSection.setFinishTime(lastRecord.getSecond());

            double actualDistance = lastRecord.getDistance() - (nextSectionDistance - 1000.0);

            int timeSpentInSeconds = currentSection.getFinishTime() - currentSection.getStartTime();

            double paceInSecondsPerKm = (timeSpentInSeconds / actualDistance) * 1000.0;

            BigDecimal pace = new BigDecimal(paceInSecondsPerKm);
            pace = pace.setScale(2, RoundingMode.HALF_UP); // 소수점 두 자리까지 반올림
            currentSection.setPace(pace.doubleValue()); // double 값으로 설정

            sectionPaces.add(currentSection);
        }


        PaceInfo paceInfo = new PaceInfo();

        double averagePace = ( totalTime / totalDistance ) * 1000.0;
        BigDecimal formattedAverage = new BigDecimal(averagePace).setScale(2, RoundingMode.HALF_UP);

        paceInfo.setAveragePace(formattedAverage.doubleValue());
        paceInfo.setMaxPace(sectionPaces.stream().mapToDouble(PaceSectionInfo::getPace).min().orElse(0));
        paceInfo.setSection(sectionPaces);

        return paceInfo;
    }
}

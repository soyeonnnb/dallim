package com.runapp.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.runapp.database.RunningDataConverters;
import com.runapp.dto.RunningDataDTO;

import java.util.Date;
import java.util.List;

@Entity
public class RunningData {
    @PrimaryKey(autoGenerate = true)
    private Long id; // 고유 ID값
    @ColumnInfo(name = "user_id")
    private Long userId; // 유저 ID값
    @ColumnInfo(name = "date")
    private Date date; // 저장 날짜
    @ColumnInfo(name = "formatted_date")
    private String formattedDate; // 변환된 날짜
    @ColumnInfo(name = "total_distance")
    private float totalDistance; // 총 달린 거리
    @ColumnInfo(name = "total_time")
    private Long totalTime; // 총 시간
    @ColumnInfo(name = "character_id")
    private int characterId; // 어떤 캐릭터인지
    @ColumnInfo(name = "step_counter")
    private float stepCounter; // 발걸음
    @ColumnInfo(name = "avgrage_pace")
    private String averagePace; // 평균 페이스
    @ColumnInfo(name = "avgrage_speed")
    private float averageSpeed; // 평균 속력
    @ColumnInfo(name = "avgrage_heart_rate")
    private float averageHeartRate; // 평균 심박수
    @ColumnInfo(name = "type")
    private String type; // 혼자뛰었는지 같이 뛰었는지
    @ColumnInfo(name = "rival_record_id")
    private Long rivalRecordId;
    @TypeConverters(RunningDataConverters.class)
    @ColumnInfo(name = "running_record_infos")
    private List<RunDetail> runningRecordInfos;

    public RunningDataDTO toDTO(){
        RunningDataDTO dto = new RunningDataDTO();
        dto.setAveragePace(this.averagePace);
        dto.setAverageSpeed(this.averageSpeed);
        dto.setUserId(this.userId);
        dto.setFormattedDate(this.formattedDate);
        dto.setTotalDistance(this.totalDistance);
        dto.setTotalTime(this.totalTime);
        dto.setCharacterId(this.characterId);
        dto.setStepCounter(this.stepCounter);
        dto.setAverageHeartRate(this.averageHeartRate);
        dto.setType(this.type);
        dto.setRivalRecordId(this.rivalRecordId);
        dto.setRunningRecordInfos(this.runningRecordInfos);
        dto.setDate(this.date.getTime());

        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

    public float getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(float totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    public float getStepCounter() {
        return stepCounter;
    }

    public void setStepCounter(float stepCounter) {
        this.stepCounter = stepCounter;
    }

    public String getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(String averagePace) {
        this.averagePace = averagePace;
    }

    public float getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(float averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public float getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(float averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getRivalRecordId() {
        return rivalRecordId;
    }

    public void setRivalRecordId(Long rivalRecordId) {
        this.rivalRecordId = rivalRecordId;
    }

    public List<RunDetail> getRunningRecordInfos() {
        return runningRecordInfos;
    }

    public void setRunningRecordInfos(List<RunDetail> runningRecordInfos) {
        this.runningRecordInfos = runningRecordInfos;
    }
}

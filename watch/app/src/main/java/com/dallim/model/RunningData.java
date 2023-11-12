package com.dallim.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.dallim.database.RunningDataConverters;
import com.dallim.dto.RunningDataDTO;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private double totalDistance; // 총 달린 거리
    @ColumnInfo(name = "total_time")
    private Long totalTime; // 총 시간
    @ColumnInfo(name = "character_id")
    private Long characterId; // 어떤 캐릭터 pk인지
    @ColumnInfo(name = "evolution_stage")
    private int evolutionStage;
    @ColumnInfo(name = "step_count")
    private double stepCount; // 발걸음
    @ColumnInfo(name = "average_pace")
    private double averagePace; // 평균 페이스
    @ColumnInfo(name = "average_speed")
    private double averageSpeed; // 평균 속력
    @ColumnInfo(name = "average_heart_rate")
    private double averageHeartRate; // 평균 심박수
    @ColumnInfo(name = "type")
    private String type; // 혼자뛰었는지 같이 뛰었는지
    @ColumnInfo(name = "rival_record_id")
    private String rivalRecordId;
    @ColumnInfo(name = "watch_or_mobile")
    private String watchOrMobile;
    @ColumnInfo(name = "is_translation")
    private Boolean isTranslation;
    @ColumnInfo(name = "init_latitude")
    private double initLatitude; // 시작 위도
    @ColumnInfo(name = "init_longitude")
    private double initLongitude; // 시작 경도
    @ColumnInfo(name = "win_or_lose")
    private String winOrLose;
    @TypeConverters(RunningDataConverters.class)
    @ColumnInfo(name = "running_record_infos")
    private List<RunDetail> runningRecordInfos;
    @ColumnInfo(name = "time_difference")
    private Long timeDifference;

    public RunningData() {
        this.date = new Date();
        this.averagePace = 0;
        this.averageHeartRate = 0;
        this.averageSpeed = 0;
        this.watchOrMobile = "WATCH";
    }

    public RunningDataDTO toDTO(){
        RunningDataDTO dto = new RunningDataDTO();
        dto.setAveragePace(this.averagePace);
        dto.setAverageSpeed(this.averageSpeed);
        dto.setUserId(this.userId);
        dto.setFormattedDate(this.formattedDate);
        dto.setTotalDistance(this.totalDistance);
        dto.setTotalTime(this.totalTime);
        dto.setCharacterId(this.characterId);
        dto.setStepCount(this.stepCount);
        dto.setAverageHeartRate(this.averageHeartRate);
        dto.setType(this.type);
        dto.setRivalRecordId(this.rivalRecordId);
        dto.setRunningRecordInfos(this.runningRecordInfos);
        dto.setDate(change(this.date.getTime()));
        dto.setWatchOrMobile("WATCH");
        dto.setInitLatitude(this.initLatitude);
        dto.setInitLongitude(this.initLongitude);
        dto.setWinOrLose(this.winOrLose);
        return dto;
    }

    public String getWinOrLose() {
        return winOrLose;
    }

    public void setWinOrLose(String winOrLose) {
        this.winOrLose = winOrLose;
    }

    public String getWatchOrMobile() {
        return watchOrMobile;
    }

    public void setWatchOrMobile(String watchOrMobile) {
        this.watchOrMobile = watchOrMobile;
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

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public double getStepCount() {
        return stepCount;
    }

    public void setStepCount(double stepCount) {
        this.stepCount = stepCount;
    }

    public double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(double averagePace) {
        this.averagePace = averagePace;
    }

    public double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public double getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(double averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRivalRecordId() {
        return rivalRecordId;
    }

    public void setRivalRecordId(String rivalRecordId) {
        this.rivalRecordId = rivalRecordId;
    }

    public List<RunDetail> getRunningRecordInfos() {
        return runningRecordInfos;
    }

    public void setRunningRecordInfos(List<RunDetail> runningRecordInfos) {
        this.runningRecordInfos = runningRecordInfos;
    }

    public Boolean getTranslation() {
        return isTranslation;
    }

    public void setTranslation(Boolean translation) {
        isTranslation = translation;
    }

    public double getInitLatitude() {
        return initLatitude;
    }

    public void setInitLatitude(double initLatitude) {
        this.initLatitude = initLatitude;
    }

    public double getInitLongitude() {
        return initLongitude;
    }

    public void setInitLongitude(double initLongitude) {
        this.initLongitude = initLongitude;
    }

    public int getEvolutionStage() {
        return evolutionStage;
    }

    public void setEvolutionStage(int evolutionStage) {
        this.evolutionStage = evolutionStage;
    }

    public Long getTimeDifference() {
        return timeDifference;
    }

    public void setTimeDifference(Long timeDifference) {
        this.timeDifference = timeDifference;
    }

    public LocalDateTime change(Long timestamp) {
        Instant instant = Instant.ofEpochMilli(timestamp); // Long 값을 그대로 사용
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime;
    }
}

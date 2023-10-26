package com.runapp.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.runapp.database.RunningDataConverters;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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
    @ColumnInfo(name = "character")
    private String character; // 어떤 캐릭터인지
    @ColumnInfo(name ="step_counter")
    private float stepCounter; // 발걸음
    @ColumnInfo(name = "avg_pace")
    private float avgPace; // 평균 속력
    @ColumnInfo(name = "avg_heart_rate")
    private float avgHeartRate; // 평균 심박수
    @ColumnInfo(name = "type")
    private String type; // 혼자뛰었는지 같이 뛰었는지
    @ColumnInfo(name = "rival_id")
    private String rivalId;
    @TypeConverters(RunningDataConverters.class)
    @ColumnInfo(name = "running_data")
    private List<RunDetail> details;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getStepCounter() {
        return stepCounter;
    }

    public void setStepCounter(float stepCounter) {
        this.stepCounter = stepCounter;
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

    public float getAvgPace() {
        return avgPace;
    }

    public void setAvgPace(float avgPace) {
        this.avgPace = avgPace;
    }

    public float getAvgHeartRate() {
        return avgHeartRate;
    }

    public void setAvgHeartRate(float avgHeartRate) {
        this.avgHeartRate = avgHeartRate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRivalId() {
        return rivalId;
    }

    public void setRivalId(String rivalId) {
        this.rivalId = rivalId;
    }

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public List<RunDetail> getDetails() {
        return details;
    }

    public void setDetails(List<RunDetail> details) {
        this.details = details;
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
}

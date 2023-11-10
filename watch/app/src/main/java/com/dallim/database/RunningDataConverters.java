package com.dallim.database;

import androidx.room.TypeConverter;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.dallim.model.RunDetail;
import com.dallim.model.runningMate.Character;
import com.dallim.model.runningMate.HeartRate;
import com.dallim.model.runningMate.Pace;
import com.dallim.model.runningMate.RunningRecordInfos;
import com.dallim.model.runningMate.User;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

/*
* Converters는 Room DB에 커스텀 타입이나 리스트를 저장하기 위해 변환해서 넣어야 돼서 사용한다.
* DB에 저장할 때 json 형식으로 직렬화를 진행하고
* DB에서 꺼내서 읽을 때 역직렬화를 통해 다시 해당 타입으로 변환시킨다.
* */
public class RunningDataConverters {
    private static Gson gson = new Gson();

    // LIST 타입의 객체를 받아서 JSON 형식의 문자열로 변환시킨다.
    @TypeConverter
    public static String fromRunDetailList(List<RunDetail> details){
        return gson.toJson(details);
    }

    // JSON 형식의 문자열을 받아서 LIST 타입의 객체로 변환시킨다.
    @TypeConverter
    public static List<RunDetail> toRunDetailList(String data){
        // TypeToken을 사용해서 변환할 데이터의 타입 정보를 제공한다.
        Type type = new TypeToken<List<RunDetail>>() {}.getType();
        // List 객체로 변환.
        return gson.fromJson(data, type);
    }

    //
    @TypeConverter
    public static LocalDateTime fromTimestamp(Long value) {
        return value == null ? null : LocalDateTime.ofInstant(Instant.ofEpochMilli(value), ZoneId.systemDefault());
    }

    @TypeConverter
    public static Long localDateTimeToTimestamp(LocalDateTime date) {
        return date == null ? null : date.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    @TypeConverter
    public static List<Integer> fromString(String value) {
        Type listType = new TypeToken<List<Integer>>() {}.getType();
        return gson.fromJson(value, listType);
    }

    @TypeConverter
    public static String fromList(List<Integer> list) {
        return gson.toJson(list);
    }

    @TypeConverter
    public static List<Double> doubleFromString(String value) {
        Type listType = new TypeToken<List<Double>>() {}.getType();
        return gson.fromJson(value, listType);
    }

    @TypeConverter
    public static String doubleFromList(List<Double> list) {
        return gson.toJson(list);
    }

    // Type converters for custom objects (example for HeartRate, similar needed for other custom objects)
    @TypeConverter
    public static HeartRate fromHeartRateString(String value) {
        return value == null ? null : gson.fromJson(value, HeartRate.class);
    }

    @TypeConverter
    public static String toHeartRateString(HeartRate heartRate) {
        return gson.toJson(heartRate);
    }

    @TypeConverter
    public static Pace fromPaceString(String value) {
        return value == null ? null : gson.fromJson(value, Pace.class);
    }

    @TypeConverter
    public static String toPaceString(Pace pace) {
        return gson.toJson(pace);
    }

    @TypeConverter
    public static User fromUserString(String value) {
        return value == null ? null : gson.fromJson(value, User.class);
    }

    @TypeConverter
    public static String toUserString(User user) {
        return gson.toJson(user);
    }

    @TypeConverter
    public static Character fromCharacterString(String value) {
        return value == null ? null : gson.fromJson(value, Character.class);
    }

    @TypeConverter
    public static String toCharacterString(Character character) {
        return gson.toJson(character);
    }

    @TypeConverter
    public static List<RunningRecordInfos> fromRunningRecordInfosString(String value) {
        Type listType = new TypeToken<List<RunningRecordInfos>>() {}.getType();
        return value == null ? null : gson.fromJson(value, listType);
    }

    @TypeConverter
    public static String toRunningRecordInfosString(List<RunningRecordInfos> runningRecordInfos) {
        return gson.toJson(runningRecordInfos);
    }


}

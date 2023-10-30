package com.runapp.database;

import androidx.room.TypeConverter;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.runapp.model.RunDetail;

import java.lang.reflect.Type;
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
}

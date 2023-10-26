package com.runapp.util;

import java.util.HashMap;
import java.util.Map;

public class Conversion {

    // m/s를 pace로 변환
    public Map<String, Object> msToPace(float speed){
        Map<String, Object> result = new HashMap<>();

        // m/s를 분으로 변환
        float paceMinutesFloat = (1000 / speed) / 60;
        int minutes = (int) paceMinutesFloat; // 정수 부분
        result.put("minutes", minutes);

        // m/s를 초로 변환
        int secondsInt = Math.round((paceMinutesFloat - minutes) * 60);
        result.put("seconds", secondsInt);

        return result;
    }




}

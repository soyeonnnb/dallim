package com.runapp.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class Conversion {

    // m/s를 pace로 변환
    public Map<String, Integer> msToPace(float speed){
        Map<String, Integer> result = new HashMap<>();

        // m/s를 분으로 변환
        float paceMinutesFloat = (1000 / speed) / 60;
        int minutes = (int) paceMinutesFloat; // 정수 부분
        result.put("minutes", minutes);

        // m/s를 초로 변환
        int secondsInt = (int) Math.round((paceMinutesFloat - minutes) * 60);
        result.put("seconds", secondsInt);

        return result;
    }

    // 날짜 형식 변환해주는 메서드
    public String formatDate(Date date) {
        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일 (E)", Locale.KOREAN);
        return localDateTime.format(formatter);
    }



}

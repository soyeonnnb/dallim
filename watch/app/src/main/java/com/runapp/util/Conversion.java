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
    public Map<String, Integer> msToPace(double speed){
        Map<String, Integer> result = new HashMap<>();

        // m/s를 분으로 변환
        double paceMinutesDouble = (1000 / speed) / 60;
        int minutes = (int) paceMinutesDouble; // 정수 부분
        result.put("minutes", minutes);

        // m/s를 초로 변환
        int secondsInt = (int) Math.round((paceMinutesDouble - minutes) * 60);
        result.put("seconds", secondsInt);

        return result;
    }

    public Map<String, Integer> sToPace(double second){
        int totalSeconds = (int) second; // 전달받은 초를 정수형으로 변환
        int minutes = totalSeconds / 60; // 전체 분 계산
        int remainingSeconds = totalSeconds % 60; // 남은 초 계산

        // 결과를 맵에 저장
        Map<String, Integer> paceMap = new HashMap<>();
        paceMap.put("minutes", minutes);
        paceMap.put("seconds", remainingSeconds);

        return paceMap; // 결과 반환
    }

    // 날짜 형식 변환해주는 메서드
    public String formatDate(Date date) {
        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일 (E)", Locale.KOREAN);
        return localDateTime.format(formatter);
    }

    public double mToKM(double m){
        double km = Math.round((m / 1000.0) / 100) * 100.0;
        System.out.println(m/1000.0);
        System.out.println(km);

        return km;
    }


}

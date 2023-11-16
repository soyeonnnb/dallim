package com.dallim.util;

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


    // 로컬데이트 타임 포맷 변경(러닝메이트 날짜)
    public String LocalDateTimeToDate(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일 (E)", Locale.KOREAN);
        return localDateTime.format(formatter);
    }

    public double mToKM(double m){
        double km = Math.round((m / 1000.0) * 100.0) / 100.0;

        return km;
    }

    public static Map<String, Integer> doublePaceToPace(Double input) {
        int totalSeconds = (int)(input * 60); // 더블 타입을 정수로 변환하여 초로 계산
        int minutes = totalSeconds / 60; // 분 계산
        int seconds = totalSeconds % 60; // 초 계산

        // 결과를 맵에 저장
        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("minutes", minutes);
        resultMap.put("seconds", seconds);

        return resultMap;
    }

    // int값인 초를 00:00로 변경
    public String secondsToTimeString(int seconds) {
        int minutes = seconds / 60;
        seconds = seconds % 60;

        // 두 자릿수로 포맷팅
        String minutesString = String.format("%02d", minutes);
        String secondsString = String.format("%02d", seconds);

        return minutesString + ":" + secondsString;
    }

    // int값인 초를 뷴:초로 변경
    public String secondsToTimeStringMS(int seconds) {
        int minutes = seconds / 60;
        seconds = Math.abs(seconds % 60);

        // 두 자릿수로 포맷팅
        String minutesString = String.format("%02d", minutes);
        String secondsString = String.format("%02d", seconds);

        return minutesString + "분 " + secondsString + "초";
    }

    // int값인 초를 분:초로 변경하는데 -, + 포함
    public String secondsToTimeStringTwo(int seconds) {
        // 부호 저장 및 절대값으로 변환
        String sign = seconds >= 0 ? "+" : "-";
        seconds = Math.abs(seconds);

        int minutes = seconds / 60;
        seconds = seconds % 60;

        // 두 자릿수로 포맷팅
        String minutesString = String.format("%02d", minutes);
        String secondsString = String.format("%02d", seconds);

        return sign + minutesString + ":" + secondsString;
    }
}

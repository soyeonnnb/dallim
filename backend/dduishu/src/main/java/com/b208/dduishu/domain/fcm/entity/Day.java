package com.b208.dduishu.domain.fcm.entity;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum Day {

    SUNDAY("SUNDAY"),MONDAY("MONDAY"),TUESDAY("TUESDAY"),WEDNESDAY("WEDNESDAY"),THURSDAY("THURSDAY"),FRIDAY("FRIDAY"),SATURDAY("SATURDAY");

    private final String value;

    Day(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static List<Day> fromString(String dayString) {
        // 쉼표와 뒤따르는 공백을 기준으로 분리하고 스트림으로 변환
        return Arrays.stream(dayString.split(",\\s*"))
                // 매핑: 문자열을 Day 열거형으로 변환
                .map(Day::searchDay)
                // 필터: null 값을 제거 (잘못된 요일 문자열을 무시)
                .filter(day -> day != null)
                // 결과 수집: List<Day>
                .collect(Collectors.toList());
    }

    public static Day searchDay(String dayString) {
        for (Day day : Day.values()) {
            if (day.getValue().equalsIgnoreCase(dayString)) {
                return day;
            }
        }
        // 예외를 던지지 않고 'null'을 반환한다고 가정할 경우
        return null;
    }

    public static Integer toInt(Day day) {
        if (day == SUNDAY) {
            return 1;
        } else if ( day == MONDAY) {
            return 2;
        } else if ( day == TUESDAY) {
            return 3;
        } else if ( day == WEDNESDAY) {
            return 4;
        } else if ( day == THURSDAY) {
            return 5;
        } else if ( day == FRIDAY) {
            return 6;
        } else {
            return 7;
        }
    }
}

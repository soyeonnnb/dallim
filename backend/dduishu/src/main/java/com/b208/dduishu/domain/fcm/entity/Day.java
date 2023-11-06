package com.b208.dduishu.domain.fcm.entity;

public enum Day {

    SUNDAY("SUNDAY"),MONDAY("MONDAY"),TUESDAY("TUESDAY"),WEDNESDAY("WEDNESDAY"),THURSDAY("THURSDAY"),FRIDAY("FRIDAY"),SATURDAY("SATURDAY");

    private final String value;

    Day(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Day fromString(String dayString) {
        for (Day day : Day.values()) {
            if (day.getValue().equalsIgnoreCase(dayString)) {
                return day;
            }
        }
        throw new IllegalArgumentException("Invalid day string: " + dayString);
    }

    public static int toInt(Day day) {
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

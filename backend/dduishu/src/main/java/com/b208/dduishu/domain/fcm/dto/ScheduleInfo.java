package com.b208.dduishu.domain.fcm.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ScheduleInfo {

    private String targetToken;
    private String title;
    private String body;
    private Date scheduleTime;
}

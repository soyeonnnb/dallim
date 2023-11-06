package com.b208.dduishu.domain.fcm.dto;

import lombok.Data;

@Data
public class RequestDto {

    private String targetToken;
    private String title;
    private String body;
}

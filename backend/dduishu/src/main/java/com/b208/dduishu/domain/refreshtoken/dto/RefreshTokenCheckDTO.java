package com.b208.dduishu.domain.refreshtoken.dto;

import lombok.Data;

@Data
public class RefreshTokenCheckDTO {

    private Long userId;
    private String refreshToken;
}

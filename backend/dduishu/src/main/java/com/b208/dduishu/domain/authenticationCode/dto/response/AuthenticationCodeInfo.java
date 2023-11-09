package com.b208.dduishu.domain.authenticationCode.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationCodeInfo {

    private String authCode;

    @Builder
    public AuthenticationCodeInfo(String authCode) {
        this.authCode = authCode;
    }
}

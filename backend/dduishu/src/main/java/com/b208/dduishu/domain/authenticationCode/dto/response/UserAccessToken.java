package com.b208.dduishu.domain.authenticationCode.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAccessToken {

    String accessToken;

    @Builder
    public UserAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}

package com.runapp.dto.request;

public class AccessTokenRequestDTO {

    private String authCode;

    public AccessTokenRequestDTO() {
    }
    public AccessTokenRequestDTO(String text) {
        this.authCode = text;
    }

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }
}

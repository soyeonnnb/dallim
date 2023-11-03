package com.runapp.dto.response;

public class AccessTokenResponseDTO {

    private String accessToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "AccessTokenResponseDTO{" +
                "accessToken='" + accessToken + '\'' +
                '}';
    }
}

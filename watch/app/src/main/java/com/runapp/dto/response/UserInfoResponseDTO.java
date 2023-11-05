package com.runapp.dto.response;

public class UserInfoResponseDTO {
    private Long userId;
    private Long characterIndex;
    private Long planetIndex;
    private String nickName;
    private String email;
    private int level;

    public UserInfoResponseDTO() {
    }

    public Long getUserId() {
        return userId;
    }

    public Long getCharacterIndex() {
        return characterIndex;
    }

    public Long getPlanetIndex() {
        return planetIndex;
    }

    public String getNickname() {
        return nickName;
    }

    public String getEmail() {
        return email;
    }

    public int getLevel() {
        return level;
    }

    @Override
    public String toString() {
        return "UserInfoResponseDTO{" +
                "userId=" + userId +
                ", characterIndex=" + characterIndex +
                ", planetIndex=" + planetIndex +
                ", nickname='" + nickName + '\'' +
                ", email='" + email + '\'' +
                ", level=" + level +
                '}';
    }
}

package com.runapp.dto.response;

public class UserInfoResponseDTO {
    private Long userId;
    private Long characterId;
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

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public Long getCharacterIndex() {
        return characterIndex;
    }

    public void setCharacterIndex(Long characterIndex) {
        this.characterIndex = characterIndex;
    }

    public Long getPlanetIndex() {
        return planetIndex;
    }

    public void setPlanetIndex(Long planetIndex) {
        this.planetIndex = planetIndex;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "UserInfoResponseDTO{" +
                "userId=" + userId +
                ", characterId=" + characterId +
                ", characterIndex=" + characterIndex +
                ", planetIndex=" + planetIndex +
                ", nickName='" + nickName + '\'' +
                ", email='" + email + '\'' +
                ", level=" + level +
                '}';
    }
}

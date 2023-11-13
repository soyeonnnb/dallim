package com.dallim;



public class UserDataResponse {
    private String status;
    private UserData data;
    private String message;

    public String getStatus() {
        return status;
    }

    public UserData getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setData(UserData data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    // getters and setters

    public static class UserData {
        private int userId;

        private String nickName;

        private int point;

        private int userLevel;

        private int userExp;

        private int characterIndex;

        private int evolutionStage;

        private int planetIndex;

        public int getUserId() {
            return userId;
        }

        public String getNickName() {
            return nickName;
        }

        public int getPoint() {
            return point;
        }

        public int getUserLevel() {
            return userLevel;
        }

        public int getUserExp() {
            return userExp;
        }

        public int getCharacterIndex() {
            return characterIndex;
        }

        public int getEvolutionStage() {
            return evolutionStage;
        }

        public int getPlanetIndex() {
            return planetIndex;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }
        public void setNickName(String nickName) {
            this.nickName = nickName;
        }

        public void setPoint(int point) {
            this.point = point;
        }

        public void setUserLevel(int userLevel) {
            this.userLevel = userLevel;
        }

        public void setUserExp(int userExp) {
            this.userExp = userExp;
        }

        public void setCharacterIndex(int characterIndex) {
            this.characterIndex = characterIndex;
        }

        public void setEvolutionStage(int evolutionStage) {
            this.evolutionStage = evolutionStage;
        }

        public void setPlanetIndex(int planetIndex) {
            this.planetIndex = planetIndex;
        }
    }
}

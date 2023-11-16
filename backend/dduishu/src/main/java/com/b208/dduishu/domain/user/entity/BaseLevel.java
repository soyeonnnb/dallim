package com.b208.dduishu.domain.user.entity;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BaseLevel {

    private static int LEVEL_GAGE = 30000;

    @Data
    static class Level {
        private int level;
        private int startExp;
        private int endExp;

        @Builder
        public Level(int level, int startExp, int endExp) {
            this.level = level;
            this.startExp = startExp;
            this.endExp = endExp;
        }
    }

    public BaseLevel() {
        createBaseLevels();
    }

    private void createBaseLevels() {
        for ( int i = 0 ; i < 50 ; i++) {
            baseLevels.add(Level.builder().level(i+1).startExp(LEVEL_GAGE * i).endExp(LEVEL_GAGE * (i+1)).build());
        }
    }

    private static final List<Level> baseLevels = new ArrayList<>();

    public static LevelInfo getLevelInfo(int exp) {
        return baseLevels.stream()
                .filter(o -> o.getStartExp() <= exp && exp < o.getEndExp())
                .map(o -> {
                    LevelInfo levelInfo = new LevelInfo();
                    levelInfo.setLevel(o.getLevel());
                    levelInfo.setCurExp(exp - o.getStartExp());
                    levelInfo.setEndExp(o.getEndExp());
                    levelInfo.setExp((int)(((double)(exp - o.getStartExp()) / (o.getEndExp() - o.getStartExp())) * 100));
                    return levelInfo;
                })
                .findFirst()
                .orElse(new LevelInfo());
    }

    @Data
    public static class LevelInfo {
        private int level;
        private int curExp;
        private int endExp;
        private int exp;
    }
}

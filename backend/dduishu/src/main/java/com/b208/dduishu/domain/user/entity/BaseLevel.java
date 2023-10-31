package com.b208.dduishu.domain.user.entity;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class BaseLevel {
    @Data
    static class Level {
        private int startExp;
        private int endExp;

        @Builder
        public Level(int startExp, int endExp) {
            this.startExp = startExp;
            this.endExp = endExp;
        }
    }

    private static final List<Level> baseLevels = List.of(
            Level.builder().startExp(0).endExp(500).build(),
            Level.builder().startExp(500).endExp(1500).build(),
            Level.builder().startExp(1500).endExp(3000).build(),
            Level.builder().startExp(3000).endExp(5000).build(),
            Level.builder().startExp(5000).endExp(7500).build(),
            Level.builder().startExp(7500).endExp(10500).build(),
            Level.builder().startExp(10500).endExp(14000).build(),
            Level.builder().startExp(14000).endExp(18000).build(),
            Level.builder().startExp(14000).endExp(18000).build(),
            Level.builder().startExp(14000).endExp(18000).build(),
            Level.builder().startExp(18000).endExp(22500).build(),
            Level.builder().startExp(22500).endExp(27500).build(),
            Level.builder().startExp(27500).endExp(33000).build()
            );

    public static LevelInfo getLevelInfo(int exp) {
        LevelInfo levelInfo = new LevelInfo();

        baseLevels.stream()
                .forEach(o -> {
                    if (o.getStartExp() <= exp && exp <= o.getEndExp()) {
                        levelInfo.setCurExp(exp - o.getStartExp());
                        levelInfo.setEndExp(o.getEndExp());
                        levelInfo.setExp((int)(((double)(exp - o.getStartExp()) / (o.getEndExp() - o.getStartExp())) * 100)
                        );
                    }
                });

        return levelInfo;
    }

    @Data
    public static class LevelInfo {
        private int curExp;
        private int endExp;
        private int exp;
    }
}

package com.b208.dduishu.domain.thema.dto.response;

import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class ThemaOverview {

    private int planetIndex;
    @JsonProperty("isPurchased")
    private boolean isPurchased;

    @Builder
    public ThemaOverview(ThemaName name) {
        this.planetIndex = getThemaIndex(name);
        this.isPurchased = false;
    }

    public ThemaOverview(Thema thema) {
        this.planetIndex = getThemaIndex(thema.getThemaInfo().getName());
        this.isPurchased = true;
    }

    private int getThemaIndex(ThemaName name) {

        if (name.equals(ThemaName.EARTH)) {
            return 0;
        } else if (name.equals(ThemaName.MOON)) {
            return 1;
        }
        return -1;
    }
}

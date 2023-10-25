package com.b208.dduishu.domain.thema.dto.response;

import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import lombok.Builder;
import lombok.Data;

@Data
public class ThemaOverview {

    private Long themaId;
    private int themaIndex;
    private ThemaName name;
    private boolean isMainThema;
    private boolean isPurchased;
    private int price;

    @Builder
    public ThemaOverview(ThemaName name) {
        this.themaId = -1L;
        this.themaIndex = getThemaIndex(name);
        this.name = name;
        this.isMainThema = false;
        this.isPurchased = false;
        this.price = 0;
    }

    public ThemaOverview(Thema thema) {
        this.themaId = thema.getId();
        this.themaIndex = getThemaIndex(thema.getThemaInfo().getName());
        this.name = thema.getThemaInfo().getName();
        this.isMainThema = thema.isMainThema();
        this.isPurchased = true;
        this.price = thema.getThemaInfo().getPrice();
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

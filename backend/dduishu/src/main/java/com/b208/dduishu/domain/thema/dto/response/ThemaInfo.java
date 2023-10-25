package com.b208.dduishu.domain.thema.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import lombok.Builder;
import lombok.Data;

@Data
public class ThemaInfo {

    private Long themaId;
    private int themaIndex;
    private ThemaName name;
    private boolean isMainThema;
    private boolean isPurchased;

    @Builder
    public ThemaInfo(ThemaName name) {
        this.themaId = -1L;
        this.themaIndex = getThemaIndex(name);
        this.name = name;
        this.isMainThema = false;
        this.isPurchased = false;
    }

    public ThemaInfo(Thema thema) {
        this.themaId = thema.getId();
        this.themaIndex = getThemaIndex(thema.getName());
        this.name = thema.getName();
        this.isMainThema = thema.isMainThema();
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

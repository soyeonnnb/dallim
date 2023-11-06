package com.b208.dduishu.domain.fcm.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.quartz.JobKey;
import org.quartz.Trigger;

@Data
@NoArgsConstructor
public class FcmMessageId {
    private Long userId;
    private Day day;
    private int hour;
    private int minute;
    private boolean state;

    @Builder
    public FcmMessageId(Long userId, Day day, int hour, int minute, boolean state) {
        this.userId = userId;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.state = state;
    }

    @Override
    public String toString() {
        return String.format("%s-%s-%d-%d", userId, day, hour, minute);
    }

    public static FcmMessageId fromString(String identityString, Trigger.TriggerState triggerState) {
        FcmMessageId customIdentity = new FcmMessageId();
        String[] parts = identityString.split("-");

        if (parts.length == 4) {
            customIdentity.setUserId(Long.parseLong(parts[0]));
            customIdentity.setDay(Day.fromString(parts[1]));
            customIdentity.setHour(Integer.parseInt(parts[2]));
            customIdentity.setMinute(Integer.parseInt(parts[3]));
        }
        if (triggerState == Trigger.TriggerState.NORMAL) {
            customIdentity.setState(true);
        } else if (triggerState == Trigger.TriggerState.PAUSED) {
            customIdentity.setState(false);
        }
        return customIdentity;
    }
}

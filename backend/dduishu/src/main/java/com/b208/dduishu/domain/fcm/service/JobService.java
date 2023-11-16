package com.b208.dduishu.domain.fcm.service;

import com.b208.dduishu.domain.fcm.dto.FireBaseCloudMessageJob;
import com.b208.dduishu.domain.fcm.dto.ScheduleInfo;
import com.b208.dduishu.domain.fcm.dto.UpdateScheduleInfo;
import com.b208.dduishu.domain.fcm.entity.Day;
import com.b208.dduishu.domain.fcm.entity.FcmMessageId;
import com.b208.dduishu.domain.fcm.entity.FcmToken;
import com.b208.dduishu.domain.fcm.repository.FcmRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class JobService {

//    private static final int SUNDAY = 1;
//    private static final int MONDAY = 2;
//    private static final int TUESDAY = 3;
//    private static final int WEDNESDAY = 4;
//    private static final int THURSDAY = 5;
//    private static final int FRIDAY = 6;
//    private static final int SATURDAY = 7;

    @Autowired
    private Scheduler scheduler;

    private final FireBaseCloudMessageService firebaseCloudMessageService;

    private final FcmRepository fcmRepository;

    private final GetUser getUser;


    public void scheduleJob(Long userId, String nickName, List<Day> day, int hour, int minute) throws SchedulerException {

        FcmToken targetToken = fcmRepository.findByUserUserId(userId);

        String title = "Dallim";
        String body = String.format("%s님! 이제 달릴 시간이에요!", nickName);
        // jobKey Nameing Rule : userId:{userId}-day:{day}-{hour}-{minute}
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("targetToken", targetToken.getFcmToken());
        jobDataMap.put("title", title);
        jobDataMap.put("body", body);
        jobDataMap.put("firebaseCloudMessageService", firebaseCloudMessageService); // FireBaseCloudMessageService 인스턴스 저장

        FcmMessageId fcmMessageId = FcmMessageId.builder()
                .userId(userId)
                .day(day)
                .hour(hour)
                .minute(minute)
                .build();

        JobDetail jobDetail = JobBuilder.newJob(FireBaseCloudMessageJob.class)
                .withIdentity(fcmMessageId.toString())
                .usingJobData(jobDataMap)
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(fcmMessageId.toString())
                .withSchedule(
                    CronScheduleBuilder
                            .atHourAndMinuteOnGivenDaysOfWeek(hour, minute, day.stream().map(o -> Day.toInt(o)).toArray(Integer[]::new))
                )
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public List<FcmMessageId> getScheduleJob() throws Exception {
        User user = getUser.getUser();

        Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.anyGroup());

        return jobKeys.stream()
                .filter(o -> {
                    try {
                        Trigger.TriggerState triggerState = scheduler.getTriggerState(new TriggerKey(o.getName()));
                        FcmMessageId fcmMessageId = FcmMessageId.fromString(o.getName(), triggerState);
                        if (fcmMessageId.getUserId() == user.getUserId()) {
                            return true;
                        }
                    } catch (SchedulerException e) {
                        throw new RuntimeException(e);
                    }
                    return false;
                })
                .map(o -> {
                    try {
                        Trigger.TriggerState triggerState = scheduler.getTriggerState(new TriggerKey(o.getName()));
                        return FcmMessageId.fromString(o.getName(), triggerState);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(toList());
    }

    public void deleteScheduleJob(ScheduleInfo req) throws SchedulerException {
        User user = getUser.getUser();

        FcmMessageId fcmMessageId = FcmMessageId.builder()
                .userId(user.getUserId())
                .day(req.getDay())
                .hour(req.getHour())
                .minute(req.getMinute())
                .build();

        System.out.println(fcmMessageId.toString());

        scheduler.deleteJob(new JobKey(fcmMessageId.toString()));
    }

    // 스케줄을 활성화하는 메서드
    public void activateSchedule(TriggerKey triggerKey) throws Exception {
        Trigger.TriggerState state = scheduler.getTriggerState(triggerKey);
        if (state == Trigger.TriggerState.PAUSED) {
            scheduler.resumeTrigger(triggerKey);
        }

        Set<TriggerKey> triggerKeys = scheduler.getTriggerKeys(GroupMatcher.anyGroup());

        for (TriggerKey key : triggerKeys) {
            System.out.println(key.toString());
        }
    }

    // 스케줄을 비활성화하는 메서드
    public void deactivateSchedule(TriggerKey triggerKey) throws Exception {
        Trigger.TriggerState state = scheduler.getTriggerState(triggerKey);
        if (state == Trigger.TriggerState.NORMAL) {
            scheduler.pauseTrigger(triggerKey);
        }
    }

    public void updateSchedule(UpdateScheduleInfo req) throws Exception {
        User user = getUser.getUser();

        FcmMessageId fcmMessageId = FcmMessageId.builder()
                .userId(user.getUserId())
                .day(req.getDay())
                .hour(req.getHour())
                .minute(req.getMinute())
                .build();

        if (req.isState() == true) {
            activateSchedule(new TriggerKey(fcmMessageId.toString()));
        } else {
            deactivateSchedule(new TriggerKey(fcmMessageId.toString()));
        }
    }
}
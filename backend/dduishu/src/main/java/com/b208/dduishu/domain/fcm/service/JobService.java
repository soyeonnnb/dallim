package com.b208.dduishu.domain.fcm.service;

import com.b208.dduishu.domain.fcm.dto.FireBaseCloudMessageJob;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JobService {

    @Autowired
    private Scheduler scheduler;

    private final FireBaseCloudMessageService firebaseCloudMessageService;

    public void scheduleJob(String targetToken, String title, String body ,Date scheduleTime) throws SchedulerException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("targetToken", targetToken);
        jobDataMap.put("title", title);
        jobDataMap.put("body", body);
        jobDataMap.put("firebaseCloudMessageService", firebaseCloudMessageService); // FireBaseCloudMessageService 인스턴스 저장

        JobDetail jobDetail = JobBuilder.newJob(FireBaseCloudMessageJob.class)
                .withIdentity(targetToken)
                .usingJobData(jobDataMap)
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(targetToken)
                .withSchedule(
//                    CronScheduleBuilder
//                            .weeklyOnDayAndHourAndMinute(
//                                DateBuilder.MONDAY, // 화요일
//                                15, // 11시
//                                0 // 0분
//                        )
                        CronScheduleBuilder.cronSchedule("0 0/1 16 ? * MON")
                )
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public List<String> getScheduleJob() throws SchedulerException {
        List<String> scheduledJobs = new ArrayList<>();
        Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.anyGroup());

        for (JobKey jobKey : jobKeys) {
            scheduledJobs.add(jobKey.toString());
        }

        return scheduledJobs;
    }

    public void deleteScheduleJob(String targetToken) throws SchedulerException {
        scheduler.deleteJob(new JobKey(targetToken));
    }
}
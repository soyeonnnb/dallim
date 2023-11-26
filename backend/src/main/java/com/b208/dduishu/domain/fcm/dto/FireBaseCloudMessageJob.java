package com.b208.dduishu.domain.fcm.dto;

import com.b208.dduishu.domain.fcm.service.FireBaseCloudMessageService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Date;

@Component
public class FireBaseCloudMessageJob implements Job {


    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        // 스케줄링할 작업을 여기에 작성
        System.out.println("Job executed at " + new Date());

        JobDataMap jobDataMap = context.getMergedJobDataMap();
        String targetToken = jobDataMap.getString("targetToken");
        String title = jobDataMap.getString("title");
        String body = jobDataMap.getString("body");
        FireBaseCloudMessageService firebaseCloudMessageService = (FireBaseCloudMessageService) jobDataMap.get("firebaseCloudMessageService"); // FireBaseCloudMessageService 추출

        System.out.println(targetToken + " "
                + title + " " + body);

        try {
            firebaseCloudMessageService.sendMessageTo(
                    targetToken,
                    title,
                    body);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
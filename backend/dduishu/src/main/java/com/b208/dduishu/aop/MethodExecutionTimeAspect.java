package com.b208.dduishu.aop;

import com.b208.dduishu.domain.runningRecordlog.service.RunningRecordLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class MethodExecutionTimeAspect {

    private long startTime;
    private final RunningRecordLogService runningRecordLogService;

    @Before("execution(* com.b208.dduishu.domain.runningRecord.service.RunningRecordService.createRunningRecord(..))")
    public void beforeMethodExecution() {
        startTime = System.currentTimeMillis();
        log.info("운동 기록 등록 시작 !");
    }

    @AfterReturning(pointcut = "execution(* com.b208.dduishu.domain.runningRecord.service.RunningRecordService.createRunningRecord(..))", returning = "id")
    public void afterMethodExecution(String id) {
        long endTime = System.currentTimeMillis();
        log.info("운동 기록 등록 종료 !");
        log.info("실행 시간(ms) : {} 밀리초", (endTime - startTime));

        runningRecordLogService.saveRunningRecordLog(id, endTime - startTime);
    }
}
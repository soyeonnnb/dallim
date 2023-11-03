package com.b208.dduishu.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class MethodExecutionTimeAspect {

    private long startTime;

    @Before("execution(* com.b208.dduishu.domain.runningRecord.controller.RunningRecordController.createRunningRecord(..))")
    public void beforeMethodExecution() {
        startTime = System.currentTimeMillis();
        log.info("운동 기록 등록 시작 !");
    }

    @After("execution(* com.b208.dduishu.domain.runningRecord.controller.RunningRecordController.createRunningRecord(..))")
    public void afterMethodExecution() {
        long endTime = System.currentTimeMillis();
        log.info("운동 기록 등록 종료 !");
        log.info("실행 시간(ms) : {} 밀리초", (endTime - startTime));
    }
}
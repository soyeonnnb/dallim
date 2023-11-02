package com.runapp.service;

import android.os.Handler;

public class TimerService {
    private Handler timerHandler;
    private Runnable timerRunnable;
    private long startTime;

    public TimerService(Handler mainHandler, Runnable runnable) {
        this.timerHandler = mainHandler;
        this.timerRunnable = runnable;
        this.startTime = System.currentTimeMillis();
    }

    public void startTimer() {
        timerHandler.postDelayed(timerRunnable, 1000);
    }

    public void stopTimer() {
        timerHandler.removeCallbacksAndMessages(null);
    }

    public long getElapsedTime() {
        return System.currentTimeMillis() - startTime;
    }
}

package com.b208.dduishu.domain.runningRecord.exception;

public class RunningRecordNotFoundException extends IllegalArgumentException{
    public RunningRecordNotFoundException(String message) {
            super(message);
        }

    public RunningRecordNotFoundException() {
            super("RunningRecord를 mongoDB에서 찾아오는 과정에서 오류가 발생함.");
        }
}

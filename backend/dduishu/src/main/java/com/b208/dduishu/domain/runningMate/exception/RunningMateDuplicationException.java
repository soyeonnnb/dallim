package com.b208.dduishu.domain.runningMate.exception;

public class RunningMateDuplicationException extends RuntimeException{
    public RunningMateDuplicationException(String message) {
            super(message);
        }

    public RunningMateDuplicationException() {
            super("runningMate가 중복되었습니다.");
        }
}

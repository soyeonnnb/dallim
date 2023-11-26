package com.b208.dduishu.domain.follow.exception;

public class RejectFollowerNotPossibleException extends RuntimeException{

    public RejectFollowerNotPossibleException(String message) {
        super(message);
    }

    public RejectFollowerNotPossibleException() {
        super("거절할 요청이 없습니다.");
    }
}

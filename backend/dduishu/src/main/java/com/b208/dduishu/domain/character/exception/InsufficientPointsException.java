package com.b208.dduishu.domain.character.exception;

public class InsufficientPointsException extends RuntimeException {
    public InsufficientPointsException() {
        super("포인트가 부족합니다.");
    }

    public InsufficientPointsException(String message) {
        super(message);
    }
}
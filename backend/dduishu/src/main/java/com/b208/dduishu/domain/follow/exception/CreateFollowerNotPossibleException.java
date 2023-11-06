package com.b208.dduishu.domain.follow.exception;

public class CreateFollowerNotPossibleException extends RuntimeException{

    public CreateFollowerNotPossibleException(String message) {
        super(message);
    }

    public CreateFollowerNotPossibleException() {
        super("같은 유저는 친구 추가 할 수 없습니다.");
    }
}

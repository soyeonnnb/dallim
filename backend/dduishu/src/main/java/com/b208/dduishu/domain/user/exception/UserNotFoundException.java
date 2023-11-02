package com.b208.dduishu.domain.user.exception;

public class UserNotFoundException extends IllegalArgumentException{
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("유저를 DB에서 찾아오는 과정에서 오류가 발생함.");
    }
}

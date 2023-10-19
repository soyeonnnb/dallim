package com.b208.dduishu.domain.user.exception;

public class UserNotFoundException extends IllegalArgumentException{
    public UserNotFoundException(String message) {
        super(message);
    }
}

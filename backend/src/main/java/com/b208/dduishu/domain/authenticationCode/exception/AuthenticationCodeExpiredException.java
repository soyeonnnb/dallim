package com.b208.dduishu.domain.authenticationCode.exception;

public class AuthenticationCodeExpiredException extends RuntimeException {

    public AuthenticationCodeExpiredException() {
        super("인증 기간이 만료됨");
    }

    public AuthenticationCodeExpiredException(String message) {
        super(message);
    }
}

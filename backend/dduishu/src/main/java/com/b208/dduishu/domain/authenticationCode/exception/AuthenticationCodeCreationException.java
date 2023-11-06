package com.b208.dduishu.domain.authenticationCode.exception;

public class AuthenticationCodeCreationException extends RuntimeException {
    public AuthenticationCodeCreationException() {
        super("인증 코드를 생성하는 과정에서 오류가 발샘함.");
    }

    public AuthenticationCodeCreationException(String message) {
        super(message);
    }
}
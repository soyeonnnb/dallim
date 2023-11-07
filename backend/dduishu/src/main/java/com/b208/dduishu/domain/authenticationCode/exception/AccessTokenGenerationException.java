package com.b208.dduishu.domain.authenticationCode.exception;

public class AccessTokenGenerationException extends RuntimeException {

    public AccessTokenGenerationException() {
        super("인증이 되지 않아 토큰을 발급할 수 없음");
    }

    public AccessTokenGenerationException(String message) {
        super(message);
    }
}

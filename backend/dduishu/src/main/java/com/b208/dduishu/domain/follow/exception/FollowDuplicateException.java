package com.b208.dduishu.domain.follow.exception;

public class FollowDuplicateException extends RuntimeException{
    public FollowDuplicateException(String message) {
            super(message);
        }

    public FollowDuplicateException() {
            super("follow 가 중복되었습니다.");
        }
}

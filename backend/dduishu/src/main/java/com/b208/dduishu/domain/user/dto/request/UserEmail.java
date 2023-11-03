package com.b208.dduishu.domain.user.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserEmail {
    @ApiModelProperty(value = "이메일", example = "useremail@naver.com")
    private String email;
}

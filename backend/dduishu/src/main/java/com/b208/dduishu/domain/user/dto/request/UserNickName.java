package com.b208.dduishu.domain.user.dto.request;

import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class UserNickName {

    @ApiParam(value="유저 닉네임", required=true, example="달림")
    private String nickname;
}

package com.b208.dduishu.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IsDuplicateNickName {
    boolean IsDuplicate;
}

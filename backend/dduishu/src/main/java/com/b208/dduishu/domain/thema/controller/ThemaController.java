package com.b208.dduishu.domain.thema.controller;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.thema.dto.response.ThemaInfo;
import com.b208.dduishu.domain.thema.service.ThemaService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ThemaController {

    private final ThemaService themaService;

    @GetMapping("/api/v1/thema")
    public ApiResponse<?> getAllThemaInfo() {
        try {
            List<ThemaInfo> ret = themaService.getAllThemaInfo();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}

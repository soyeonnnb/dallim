package com.b208.dduishu.domain.character.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.service.CharacterService;
import com.b208.dduishu.util.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @GetMapping("/api/v1/character")
    public ApiResponse<?> getAllCharacterInfo() {
        try {
            List<CharacterInfo> ret = characterService.getCharacterInfo();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}

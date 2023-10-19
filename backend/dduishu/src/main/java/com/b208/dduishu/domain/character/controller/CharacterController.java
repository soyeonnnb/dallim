package com.b208.dduishu.domain.character.controller;

import java.util.List;

import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.domain.character.dto.request.MainCharacterInfo;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/v1/character/{id}")
    public ApiResponse<?> getCharacterInfoDetail(@PathVariable Long id) {
        try {
            CharacterInfoDetail ret = characterService.getCharacterInfoDetail(id);

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PatchMapping("/api/v1/character")
    public ApiResponse<?> updateMainCharacter(@RequestBody MainCharacterInfo req) {
        try {
            characterService.updateMainCharacter(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}

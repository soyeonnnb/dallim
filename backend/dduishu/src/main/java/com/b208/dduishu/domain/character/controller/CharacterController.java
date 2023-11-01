package com.b208.dduishu.domain.character.controller;

import com.b208.dduishu.domain.character.dto.request.CharacterId;
import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.domain.character.dto.request.PurchaseCharacterIndex;
import org.springframework.web.bind.annotation.*;

import com.b208.dduishu.domain.character.service.CharacterService;
import com.b208.dduishu.util.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

//    @GetMapping("/api/v1/character")
//    public ApiResponse<?> getAllCharacterInfo() {
//        try {
//
//            CharacterInfoResult ret = characterService.getCharacterInfo();
//
//            return ApiResponse.createSuccess(ret);
//        } catch (Exception e) {
//            return ApiResponse.createError(e.getMessage());
//        }
//    }

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
    public ApiResponse<?> updateMainCharacter(@RequestBody CharacterId req) {
        try {
            characterService.updateMainCharacter(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PostMapping("/api/v1/character")
    public ApiResponse<?> purchaseCharacter(@RequestBody PurchaseCharacterIndex req) {
        try {
            characterService.purchaseCharacter(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}

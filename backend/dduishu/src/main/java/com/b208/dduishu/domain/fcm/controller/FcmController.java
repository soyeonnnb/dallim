package com.b208.dduishu.domain.fcm.controller;

import com.b208.dduishu.domain.fcm.dto.RequestDto;
import com.b208.dduishu.domain.fcm.service.FireBaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FcmController {

    private final FireBaseCloudMessageService firebaseCloudMessageService;

    @PostMapping("/api/fcm")
    public ResponseEntity pushMessage(@RequestBody RequestDto requestDTO) throws IOException {
        System.out.println(requestDTO.getTargetToken() + " "
                +requestDTO.getTitle() + " " + requestDTO.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestDTO.getTargetToken(),
                requestDTO.getTitle(),
                requestDTO.getBody());
        return ResponseEntity.ok().build();
    }
}

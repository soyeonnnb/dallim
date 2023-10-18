package com.b208.dduishu.domain.runningRecord.controller;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.response.ApiResponse;
import com.google.protobuf.Api;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RunningRecordController {

    private final RunningRecordRepository runningRecordRepository;
    private final UserRepository userRepository;
    private final CharacterRepository characterRepository;

    @PostMapping("/api/v1/running")
    public ApiResponse<?> createRunningRecord(@RequestBody RunningRecordInfo req) {
        try {

            User user = userRepository.findByUserId(req.getUserId()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            Character character = characterRepository.findById(req.getCharacterId()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            RunningRecord rivalRunningRecord = runningRecordRepository.findById(req.getRivalRecordId()).orElseThrow(() -> {
                throw new NullPointerException();
            });

            RunningRecord res = req.toRunningRecord(user, character, rivalRunningRecord);

            runningRecordRepository.save(res);


//            RunningRecord record = runningRecordRepository.findById(res.get_id()).get();
//
//            System.out.println(record.toString());

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

}

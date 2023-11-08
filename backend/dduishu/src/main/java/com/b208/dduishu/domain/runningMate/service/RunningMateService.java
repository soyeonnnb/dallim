package com.b208.dduishu.domain.runningMate.service;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningMate.dto.request.CreateRunningMateInfo;
import com.b208.dduishu.domain.runningMate.dto.request.RunningMateInfo;
import com.b208.dduishu.domain.runningMate.exception.RunningMateDuplicationException;
import com.b208.dduishu.domain.runningMate.repository.RunningMateRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class RunningMateService {

    private final UserRepository userRepository;
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;
    private final RunningMateRepository runningMateRepository;

    public void createRunningMate(CreateRunningMateInfo req) {
        User user = getUser.getUser();

        if (isDuplicate(new ObjectId(req.getObjectId()))) {
            throw new RunningMateDuplicationException();
        }
        RunningRecord record = runningRecordRepository.findById((new ObjectId(req.getObjectId()))).orElseThrow(() -> {
            throw new NullPointerException();
        });

        RunningMate runningMate = RunningMate.builder()
                .user(new UserInfo(user))
                .rivalRecord(new RivalRunningRecordInfo(record))
                .build();

        runningMateRepository.save(runningMate);
    }

    private boolean isDuplicate(ObjectId objectId) {
        boolean runningMate = runningMateRepository.existsRunningMateByRivalRecordId(objectId);

        if (runningMate) {
            return true;
        }
        return false;
    }

    public List<RunningMateInfo> getAllRunningMate() {
        User user = getUser.getUser();

        List<RunningMate> res = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningMateInfo(o))
                .collect(toList());
    }

    public void deleteRunningMate(ObjectId id) {
        runningMateRepository.deleteById(id);
    }
}

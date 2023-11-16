package com.b208.dduishu.domain.rawRunningRecord.service;

import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RawRunningRecordService {

    private final RunningRecordRepository runningRecordRepository;


}

package com.b208.dduishu.domain.runningRecord.repository;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RunningRecordRepository extends MongoRepository<RunningRecord, ObjectId> {
    List<RunningRecord> findByCreatedAtGreaterThanEqualAndUserUserId(LocalDateTime date, Long userId);

    List<RunningRecord> findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime date, Long userId);

    List<RunningRecord> findTop10ByUserUserIdOrderByTotalTimeDesc(Long userId);

    List<RunningRecord> findTop10ByUserUserIdOrderByTotalDistanceDesc(Long userId);

    List<RunningRecord> findTop10ByUserUserIdOrderByAverageSpeedDesc(Long userId);
}

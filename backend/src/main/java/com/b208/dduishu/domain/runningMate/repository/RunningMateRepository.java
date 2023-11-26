package com.b208.dduishu.domain.runningMate.repository;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RunningMateRepository extends MongoRepository<RunningMate, ObjectId> {

    List<RunningMate> findAllByUserUserId(Long userId);

    boolean existsRunningMateByUserUserIdAndRivalRecordId(Long userId, ObjectId objectId);

    RunningMate findByUserUserIdAndRivalRecordId(Long userId, ObjectId rivalRecordId);
}

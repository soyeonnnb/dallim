package com.b208.dduishu.domain.runningRecord.repository;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RunningRecordRepository extends MongoRepository<RunningRecord, ObjectId> {
}

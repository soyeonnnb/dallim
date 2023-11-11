package com.b208.dduishu.domain.rawRunningRecord.repository;

import com.b208.dduishu.domain.rawRunningRecord.document.RawRunningRecord;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RawRunningRecordRepository extends MongoRepository<RawRunningRecord, ObjectId> {

    RawRunningRecord findByRunningRecordId(String runningRecordId);
}

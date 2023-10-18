package com.b208.dduishu.domain.runningRecordHeartRate.repository;

import com.b208.dduishu.domain.runningRecordHeartRate.document.RunningRecordHeartRate;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RunningRecordHeartRateRepository extends MongoRepository<RunningRecordHeartRate, ObjectId> {
}

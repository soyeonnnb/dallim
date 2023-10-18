package com.b208.dduishu.domain.runningRecordDistance.repository;

import com.b208.dduishu.domain.runningRecordDistance.document.RunningRecordDistance;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RunningRecordDistanceRepository extends MongoRepository<RunningRecordDistance, ObjectId> {
}

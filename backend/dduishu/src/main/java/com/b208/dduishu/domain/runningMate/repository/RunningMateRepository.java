package com.b208.dduishu.domain.runningMate.repository;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RunningMateRepository extends MongoRepository<RunningMate, ObjectId> {
}

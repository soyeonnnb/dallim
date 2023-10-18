package com.b208.dduishu.domain.runningRecordDistance.document;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Document(collection = "runningRecordDistance")
@ToString
public class RunningRecordDistance {

    @Id
    private ObjectId id;
    private int second;
    private int distance;

    @Builder
    public RunningRecordDistance(int second, int distance) {
        this.second = second;
        this.distance = distance;
    }
}

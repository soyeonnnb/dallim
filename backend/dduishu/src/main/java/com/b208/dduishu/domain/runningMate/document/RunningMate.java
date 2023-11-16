package com.b208.dduishu.domain.runningMate.document;

import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "runningMate")
@ToString
public class RunningMate {

    @Id
    private ObjectId id;
    private UserInfo user;
    private RivalRunningRecordInfo rivalRecord;
    private boolean hasWin;
    private LocalDateTime createdAt;

    @Builder
    public RunningMate(ObjectId id, UserInfo user, RivalRunningRecordInfo rivalRecord, boolean hasWin) {
        this.id = id;
        this.user = user;
        this.rivalRecord = rivalRecord;
        this.hasWin = hasWin;
        this.createdAt = LocalDateTime.now();
    }
}

package com.runapp.dto.response;

import com.runapp.model.runningMate.Character;
import com.runapp.model.runningMate.HeartRate;
import com.runapp.model.runningMate.Pace;
import com.runapp.model.runningMate.RunningRecordInfos;
import com.runapp.model.runningMate.User;

import java.time.LocalDateTime;
import java.util.List;

public class RunningMateRunningRecordDTO {
    private Long id;
    private String location;
    private String watchOrMobile;
    private List<Integer> secondPerSpeed;
    private HeartRate heartRate;
    private Pace pace;
    private double stepCount;
    private User user;
    private Character character;
    private String type;
    private RunningRecordInfos runningRecordInfos;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private LocalDateTime createdAt;
}

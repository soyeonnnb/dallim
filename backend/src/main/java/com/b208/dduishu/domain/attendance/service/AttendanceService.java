package com.b208.dduishu.domain.attendance.service;

import com.b208.dduishu.domain.attendance.dto.response.AttendanceInfo;
import com.b208.dduishu.domain.attendance.entity.Attendance;
import com.b208.dduishu.domain.attendance.repository.AttendanceRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final GetUser getUser;

    @Transactional
    public void markUserAttendance() {
        User user = getUser.getUser();

        Attendance attendance = Attendance.builder()
                .user(user)
                .attendanceDate(LocalDate.now())
                .attendanceTime(LocalTime.now())
                .build();

        attendanceRepository.save(attendance);
    }

    public AttendanceInfo getAllUserAttendance() {

        User user = getUser.getUser();

        List<Attendance> findAttendances = attendanceRepository.findAllByUserUserId(user.getUserId());

        List<LocalDate> attendances = findAttendances.stream()
                .map(o -> o.getAttendanceDate())
                .collect(toList());

        return AttendanceInfo.builder()
                .attendances(attendances)
                .build();
    }
}

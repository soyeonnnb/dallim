package com.b208.dduishu.domain.attendance.repository;

import com.b208.dduishu.domain.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findAllByUserUserId(Long userId);
}

package com.b208.dduishu.domain.attendance.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;

    private LocalDate attendanceDate;

    private LocalTime attendanceTime;

    @Builder
    public Attendance(Long id, User user, LocalDate attendanceDate, LocalTime attendanceTime) {
        this.id = id;
        this.user = user;
        this.attendanceDate = attendanceDate;
        this.attendanceTime = attendanceTime;
    }
}

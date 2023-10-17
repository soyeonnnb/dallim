package com.b208.dduishu.domain.pointLog.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class PointLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_log_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int point;

    private LocalDateTime createdAt;

}

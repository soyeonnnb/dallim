package com.b208.dduishu.domain.alarm.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @OneToOne
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @Enumerated(EnumType.STRING)
    private alarmType type;

}

package com.b208.dduishu.domain.fcm.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "fcm_token")
@NoArgsConstructor
public class FcmToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fcm_token_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String fcmToken;

    private LocalDateTime createdAt;

    @Builder
    public FcmToken(Long id, User user, String fcmToken, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.fcmToken = fcmToken;
        this.createdAt = createdAt;
    }
}

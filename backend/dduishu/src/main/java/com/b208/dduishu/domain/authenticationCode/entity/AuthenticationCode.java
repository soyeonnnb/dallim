package com.b208.dduishu.domain.authenticationCode.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Table(name = "authentication_code")
@NoArgsConstructor
public class AuthenticationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authentication_code_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String authCode;

    private boolean isAuthenticated;

    private Date expireTime;

    @Builder
    public AuthenticationCode(Long id, User user, String authCode, boolean isAuthenticated, Date expireTime) {
        this.id = id;
        this.user = user;
        this.authCode = authCode;
        this.isAuthenticated = isAuthenticated;
        this.expireTime = expireTime;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAuthCodeState(boolean isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    }
}

package com.b208.dduishu.domain.user.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.b208.dduishu.domain.character.entity.Character;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.b208.dduishu.domain.user.dto.request.UserDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(nullable = false)
    private String accountType;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false, unique = true)
    private String nickname;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Character> characterList = new ArrayList<>();

    private int level;
    private int cumulativeDistance;
    private int point;
    @Column(nullable = false)
    private String profileImage;
    @Column(nullable = false)
    private String privateAccess;
    @CreatedDate
    @Column()
    private LocalDateTime registDate;
    @LastModifiedDate
    @Column()
    private LocalDateTime lastLoginDate;
    @Column(nullable = false)
    private boolean deleteCheck;
    @Column(nullable = false)
    private String accessToken;
    @Column(nullable = false)
    private int createCount;


    public User() {
    }

    @Builder
    public User(Long userId, String accountType, String email, String nickname, int level, int cumulativeDistance,int point, String profileImage, String privateAccess, LocalDateTime registDate, LocalDateTime lastLoginDate, boolean deleteCheck, String accessToken, int createCount) {
        this.userId = userId;
        this.accountType = accountType;
        this.email = email;
        this.nickname = nickname;
        this.cumulativeDistance = cumulativeDistance;
        this.level = level;
        this.point = point;
        this.profileImage = profileImage;
        this.privateAccess = privateAccess;
        this.registDate = registDate;
        this.lastLoginDate = lastLoginDate;
        this.deleteCheck = deleteCheck;
        this.accessToken = accessToken;
        this.createCount = createCount;
    }

    public void updateNickname(String newNickname) {
        this.nickname = newNickname;
    }

    public void updateprofileImage(String profileImage){
        this.profileImage = profileImage;
    }

    public UserDTO toUserDTO(){
        return UserDTO.builder()
            .userId(this.userId)
            .accountType(this.accountType)
            .email(this.email)
            .nickname(this.nickname)
            .profileImage(this.profileImage)
            .build();
    }

    public void updateLastLoginDate() {
        this.lastLoginDate = LocalDateTime.now();
    }

    public void updateAccessToken(String accessToken){
        this.accessToken = accessToken;
    }

    public void updatePrivateAccessToken(String privateAccessToken){
        this.privateAccess = privateAccessToken;
    }



}

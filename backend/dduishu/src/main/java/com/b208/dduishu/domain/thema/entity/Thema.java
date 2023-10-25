package com.b208.dduishu.domain.thema.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "thema")
@NoArgsConstructor
public class Thema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thema_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thema_info_id")
    private ThemaInfo themaInfo;

    private boolean isMainThema;

    @Builder
    public Thema(Long id, User user, ThemaInfo themaInfo, boolean isMainThema) {
        this.id = id;
        this.user = user;
        this.themaInfo = themaInfo;
        this.isMainThema = isMainThema;
    }

    public void setMainThema(boolean thema) {
        this.isMainThema = thema;
    }
}

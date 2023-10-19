package com.b208.dduishu.domain.user;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.exception.UserNotFoundException;
import com.b208.dduishu.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GetUser {

    private final UserRepository userRepository;

    public User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.toString());
        Object principal = authentication.getPrincipal();
        System.out.println(principal.toString());
        Long userId = (Long) principal;

        Optional<User> byUserId = Optional.ofNullable(userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("pk에 해당하는 유저 존재하지 않음")));

        User user = byUserId.get();


        return user;
    }

}

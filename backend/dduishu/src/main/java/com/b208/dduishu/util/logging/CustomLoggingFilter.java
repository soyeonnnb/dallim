package com.b208.dduishu.util.logging;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

@Component
@Slf4j
public class CustomLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NotNull final HttpServletRequest request,
                                    @NotNull final HttpServletResponse response,
                                    final FilterChain filterChain)
            throws ServletException, IOException {
        long startTime = System.currentTimeMillis();

        ContentCachingRequestWrapper wrappingRequest = new ContentCachingRequestWrapper(request);
        filterChain.doFilter(wrappingRequest, response);

        long endTime = System.currentTimeMillis();

        log.info("HTTP Method : {}, URI : {}", request.getMethod(), request.getRequestURI());
        log.info("API 응답 시간 (ms) : {}", endTime - startTime);
    }
}
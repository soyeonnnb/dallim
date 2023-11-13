package com.b208.dduishu.util.logging;

import com.b208.dduishu.util.logging.LogForm;
import com.b208.dduishu.util.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalControllerAdvice {
    // 예외 처리 로직을 구현할 메서드들을 정의합니다.
    private final ObjectMapper objectMapper;

    // 예외 처리 메서드 예시:
    @ExceptionHandler(Exception.class)
    public void handleException(final HttpServletRequest request, final HttpServletResponse response, Exception e, final ContentCachingRequestWrapper cachingRequest) throws IOException {

            log.info(LogForm.FAILED_LOGGING_FORM,
                    request.getMethod(),
                    request.getRequestURI(),
                    StringUtils.hasText(request.getHeader("Authorization")),
                    objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                    e.getMessage());
            log.debug("Stack trace: ", e);

        String apiResponse = objectMapper.writeValueAsString(ApiResponse.createError(e.getMessage()));

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(500);
        response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());

        response.getOutputStream().write(apiResponse.getBytes());
    }
}
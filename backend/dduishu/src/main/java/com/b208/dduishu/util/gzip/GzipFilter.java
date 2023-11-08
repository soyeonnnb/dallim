package com.b208.dduishu.util.gzip;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPOutputStream;

public class GzipFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.startsWith("/api/v1/running");
    }
    @Override
    public void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        if (request.getMethod().equals(HttpMethod.GET.name())) {
            ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

            chain.doFilter(request, responseWrapper);

            byte[] responseArray = responseWrapper.getContentAsByteArray();

            // The response body is encoded using gzip
            response.setHeader(HttpHeaders.CONTENT_ENCODING, "gzip");
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());

            try (GZIPOutputStream gzipOutputStream = new GZIPOutputStream(response.getOutputStream())) {
                gzipOutputStream.write(responseArray);
                gzipOutputStream.finish();
            }
        } else {
            chain.doFilter(request, response);
        }
    }
}
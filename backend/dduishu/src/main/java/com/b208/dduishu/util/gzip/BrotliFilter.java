package com.b208.dduishu.util.gzip;

import com.aayushatharva.brotli4j.Brotli4jLoader;
import com.aayushatharva.brotli4j.encoder.Encoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
public class BrotliFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.startsWith("/api/v1/brotli");
    }
    @Override
    public void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        if (request.getMethod().equals(HttpMethod.GET.name())) {
            long start = System.nanoTime();
//            ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);
            ResponseBodyEncryptWrapper responseWrapper = new ResponseBodyEncryptWrapper(response);

            chain.doFilter(request, responseWrapper);

            long end = System.nanoTime();
            // Response Body Data 가지고 옴
            // byte[] responseArray = responseWrapper.getContentAsByteArray();
            byte[] responseArray = responseWrapper.getDataStreamToBytes();
            log.info("시간 (ms): " + (end - start) / 1_000_000);

            // Load the native library
            Brotli4jLoader.ensureAvailability();

            // Compress data and get output in byte array
            long startTime = System.nanoTime();
            Encoder.Parameters parameters = new Encoder.Parameters().setQuality(6);
            byte[] compressed = Encoder.compress(responseArray, parameters);
            long endTime = System.nanoTime();

            // Calculate compression ratio as a percentage of original size
            double originalSize = responseArray.length;
            double compressedSize = compressed.length;
            double compressionRatio = compressedSize / originalSize * 100.0;

            // Calculate compression time in milliseconds
            long compressionTimeMillis = (endTime - startTime) / 1_000_000;

            // The response body is encoded using gzip
            response.setHeader(HttpHeaders.CONTENT_ENCODING, "br");
            response.setContentLength(compressed.length);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.displayName());

            long start1 = System.nanoTime();
            response.getOutputStream().write(compressed);
            long end1 = System.nanoTime();

            log.info("전송 시간 :" + (end1 - start1) / 1_000_000);

            log.info("original Size :" + originalSize);
            log.info("compressed Size :" + compressedSize);
            // Log compression ratio and compression time
            log.info("Compression Ratio ( compressed Size / original Size * 100): " + compressionRatio);
            log.info("Compression Time (ms): " + compressionTimeMillis);

        } else {
            chain.doFilter(request, response);
        }
    }

}
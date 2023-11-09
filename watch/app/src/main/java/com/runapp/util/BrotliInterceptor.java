package com.runapp.util;

import okhttp3.Interceptor;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.BufferedSource;
import org.brotli.dec.BrotliInputStream;

import java.io.IOException;
import java.util.Objects;

/**
 * Transparent Brotli response support.
 *
 * Adds Accept-Encoding: br to request and checks (and strips) for Content-Encoding: br in
 * responses. This replaces the transparent gzip compression in BridgeInterceptor.
 */
public class BrotliInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        if (chain.request().header("Accept-Encoding") == null) {
            // Add Accept-Encoding header
            Response originalResponse = chain.proceed(chain.request().newBuilder()
                    .header("Accept-Encoding", "br,gzip")
                    .build());

            // Check if we have a Brotli Content-Encoding response
            if ("br".equalsIgnoreCase(originalResponse.header("Content-Encoding"))) {
                // Strip the content encoding
                ResponseBody body = originalResponse.body();
                BufferedSource source = body.source();
                BrotliInputStream brotliInputStream = new BrotliInputStream(source.inputStream());
                String contentType = body.contentType().toString();
                long contentLength = body.contentLength();

                // Build a new response without the content-encoding header and with the BrotliInputStream
                return originalResponse.newBuilder()
                        .header("Content-Encoding", contentType)
                        .body(new BrotliResponseBody(contentType, contentLength, brotliInputStream))
                        .build();
            }

            return originalResponse;
        } else {
            return chain.proceed(chain.request());
        }
    }

    private static class BrotliResponseBody extends ResponseBody {
        private final String contentType;
        private final long contentLength;
        private final BrotliInputStream brotliInputStream;

        BrotliResponseBody(String contentType, long contentLength, BrotliInputStream brotliInputStream) {
            this.contentType = contentType;
            this.contentLength = contentLength;
            this.brotliInputStream = brotliInputStream;
        }

        @Override
        public okhttp3.MediaType contentType() {
            return okhttp3.MediaType.parse(contentType);
        }

        @Override
        public long contentLength() {
            return contentLength;
        }

        @Override
        public BufferedSource source() {
            return okio.Okio.buffer(okio.Okio.source(brotliInputStream));
        }
    }
}

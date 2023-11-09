package com.runapp.util;

import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.BufferedSource;

import org.brotli.dec.BrotliInputStream;

import java.io.IOException;
import java.io.InputStream;

public class BrotliInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        Response originalResponse = chain.proceed(chain.request());
        if ("br".equals(originalResponse.header("Content-Encoding"))) {
            return originalResponse.newBuilder()
                    .body(new BrotliResponseBody(originalResponse.body()))
                    .build();
        }
        return originalResponse;
    }

    private static class BrotliResponseBody extends ResponseBody {
        private final ResponseBody responseBody;
        private InputStream brotliInputStream;

        BrotliResponseBody(ResponseBody responseBody) throws IOException {
            this.responseBody = responseBody;
            this.brotliInputStream = new BrotliInputStream(responseBody.byteStream());
        }

        @Override
        public MediaType contentType() {
            return null;
        }

        @Override
        public long contentLength() {
            return 0;
        }

        @Override
        public BufferedSource source() {
            return null;
        }

        // 이하 메소드 구현 생략...
    }
}

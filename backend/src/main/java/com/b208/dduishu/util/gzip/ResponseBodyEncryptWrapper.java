package com.b208.dduishu.util.gzip;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ResponseBodyEncryptWrapper extends HttpServletResponseWrapper {

    ByteArrayOutputStream byteArrayOutputStream;
    ResponseBodyServletOutputStream responseBodyServletOutputStream;

    public ResponseBodyEncryptWrapper(HttpServletResponse response) {
        super(response);
        byteArrayOutputStream = new ByteArrayOutputStream();
    }

    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        if (responseBodyServletOutputStream == null) {
            responseBodyServletOutputStream = new ResponseBodyServletOutputStream(byteArrayOutputStream);
        }
        return responseBodyServletOutputStream;
    }

    // 가로챈 Response Body Get
    public byte[] getDataStreamToBytes() {
        return byteArrayOutputStream.toByteArray();
    }
}
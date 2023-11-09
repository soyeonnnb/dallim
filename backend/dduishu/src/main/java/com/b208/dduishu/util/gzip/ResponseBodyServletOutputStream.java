package com.b208.dduishu.util.gzip;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ResponseBodyServletOutputStream extends ServletOutputStream {

    private final DataOutputStream outputStream;

    public ResponseBodyServletOutputStream(OutputStream output) {
        this.outputStream = new DataOutputStream(output);
    }

    @Override
    public void write(int b) throws IOException {
        outputStream.write(b);
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public void setWriteListener(WriteListener listener) {
    }
}
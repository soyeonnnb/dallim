package com.dallim.util;

import android.content.Context;
import android.speech.tts.TextToSpeech;
import android.util.Log;

import java.util.Locale;

public class TtsUtil {

    private Context context;
    private TextToSpeech tts;
    private boolean isInitialized = false;
    private Runnable initializationCallback;

    public TtsUtil(Context context) {
        this.context = context;
        tts = new TextToSpeech(context, status -> {
            if (status != TextToSpeech.ERROR){
                int result = tts.setLanguage(Locale.KOREAN); // 언어 선택
                if(result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED){
                    Log.e("TTS", "지원하지 않는 언어");
                }else{
                    isInitialized = true;
                    if (initializationCallback != null) {
                        initializationCallback.run();
                    }
                }
            }else{
                Log.e("TTS", "초기화 실패");
            }
        });
    }

    public void setInitializationCallback(Runnable callback) {
        this.initializationCallback = callback;
        if (isInitialized) {
            callback.run();
        }
    }

    public void speak(String text) {
        if (isInitialized) {
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
        } else {
            Log.e("TTS", "TTS가 초기화되지 않음.");
        }
    }

    public void stop() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
    }
}

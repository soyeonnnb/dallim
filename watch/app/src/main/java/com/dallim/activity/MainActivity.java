package com.dallim.activity;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.res.ResourcesCompat;
import androidx.core.view.InputDeviceCompat;
import androidx.core.view.MotionEventCompat;
import androidx.core.view.ViewConfigurationCompat;

import com.dallim.R;
import com.dallim.databinding.ActivityMainBinding;
import com.dallim.util.AccessToken;
import com.dallim.util.NetworkUtil;
import com.dallim.util.PreferencesUtil;
import com.dallim.util.TtsUtil;
import com.dallim.util.UserInfo;
import com.dallim.util.VibrateDevice;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends ComponentActivity{
    private ActivityMainBinding binding;
    private SharedPreferences prefs;
    private NetworkUtil networkUtil;
    private String authenticateduth;
    private UserInfo userInfo;
    private int permissionIndex = 0;
    private List<String> permissionsNeeded;
    private boolean shouldShowSettings = false;
    private static final int SETTINGS_REQUEST_CODE = 160;


    @SuppressLint("InvalidWakeLockTag")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        // 리시버 인스턴스를 생성합니다.
        networkUtil = new NetworkUtil();

        // 바인딩 클래스를 사용해서 xml코드를 객체화시킨다. findViewById를 안 쓰고 바인딩 클래스로 편하게 사용.
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        // xml 레이아웃의 최상위 뷰를 가져옴
        View view = binding.getRoot();
        // 액티비티의 컨텐츠 뷰로 view를 설정. 여기서 화면에 뭐가 보일지 결정
        setContentView(view);

        // 권한 확인 시작
        checkPermission();

        PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
        boolean isPowerSaveMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP && powerManager.isPowerSaveMode();
        boolean isIgnoringBatteryOptimizations = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && powerManager.isIgnoringBatteryOptimizations(getPackageName());

        if (isPowerSaveMode) {
            Intent intent = new Intent(MainActivity.this, SaveModeActivity.class);
            startActivity(intent);
            MainActivity.this.finish();
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        // 인텐트 필터를 생성하고, 리시버를 등록합니다.
        IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        registerReceiver(networkUtil, filter);
    }

    private void showAlert() {
        LayoutInflater inflater = this.getLayoutInflater();
        ScrollView scrollView = (ScrollView) inflater.inflate(R.layout.modal, null); // custom_alert_dialog.xml이 커스텀 레이아웃입니다.

        scrollView.post(new Runnable() {
            @Override
            public void run() {
                scrollView.setOnGenericMotionListener((v1, event) -> false);
                scrollView.requestFocus();
            }
        });

        Button cancel = scrollView.findViewById(R.id.cancel);
        Button finish = scrollView.findViewById(R.id.finish);

        TextView text = scrollView.findViewById(R.id.text_view);
        Typeface typeface = ResourcesCompat.getFont(getApplicationContext(), R.font.oagothic_medium);
        text.setTypeface(typeface);
        text.setText("달림을 사용하기 위해서는\n인증이 필요합니다.");
        finish.setText("인증하기");

        AlertDialog dialog = showDialogWithRotaryInput(scrollView, scrollView);

        cancel.setOnClickListener(v ->{
            dialog.dismiss();
        });

        dialog.show();
        scrollView.requestFocus();

        finish.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, AuthActivity.class);
            startActivity(intent);
            dialog.dismiss();
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // 설정에서 돌아온 경우 권한을 다시 확인합니다.
        if (requestCode == SETTINGS_REQUEST_CODE) {
            checkPermissionsAgain();
        }
    }


    /*
     * 요청에 대한 사용자의 권한 응답(승인 or 거절)을 받으면 실행된다.
     * onRequestPermissionsResult는 프래그먼트에서 사용되길 권장한다.
     * 하지만 메인 액티비티에서 권한 확인을 받는 게 맞아보여서 액티비티에서 사용함.
     */

    // 권한 요청을 시작하는 메서드
    private void checkPermission() {
        permissionsNeeded = new ArrayList<>();
        permissionsNeeded.add(Manifest.permission.ACCESS_FINE_LOCATION);
        permissionsNeeded.add(Manifest.permission.ACCESS_COARSE_LOCATION);
        permissionsNeeded.add(Manifest.permission.BODY_SENSORS);
        permissionsNeeded.add(Manifest.permission.POST_NOTIFICATIONS);
        permissionsNeeded.add(Manifest.permission.VIBRATE);

        requestNextPermission();
    }

    // 다음 권한을 요청하는 메서드
    private void requestNextPermission() {
        if (permissionIndex < permissionsNeeded.size()) {
            String permission = permissionsNeeded.get(permissionIndex);
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{permission}, permissionIndex);
            } else {
                permissionIndex++;
                requestNextPermission();
            }
        } else {
            checkAllPermissionsGranted();
        }
    }

    // 모든 권한이 승인되었는지 확인하는 메서드
    private void checkAllPermissionsGranted() {
        if (shouldShowSettings) {
            // 모든 권한이 승인되지 않았으므로 사용자에게 설정 창으로 이동하라는 알림을 표시합니다.
            showSettingsAlert();
        }
    }
    // 설정 창으로 이동하라는 알림을 표시하는 메서드
    private void showSettingsAlert() {
        new AlertDialog.Builder(this)
                .setTitle("권한 설정 필요")
                .setMessage("달림의 모든 기능을 사용하려면 필요한 권한(위치, 알림, 센서)을 설정에서 승인해야 합니다.")
                .setPositiveButton("설정으로 이동", (dialog, which) -> goToSettings())
                .setNegativeButton("취소", (dialog, which) -> finish())
                .create().show();
    }

    // 설정 창으로 이동하는 메서드
    private void goToSettings() {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                Uri.fromParts("package", getPackageName(), null));
        startActivityForResult(intent, SETTINGS_REQUEST_CODE);
        finish();
    }

    // 권한 요청 결과를 처리하는 메서드
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode < permissionsNeeded.size()) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // 승인된 경우 다음 권한을 요청합니다.
                permissionIndex++;
                requestNextPermission();
            } else {
                if (!ActivityCompat.shouldShowRequestPermissionRationale(this, permissions[0])) {
                    // 사용자가 '다시 묻지 않음'을 선택한 경우
                    shouldShowSettings = true;
                }
                // 거부된 경우 다음 권한을 요청합니다.
                permissionIndex++;
                requestNextPermission();
            }
        }
    }


    @Override
    protected void onResume() {
        super.onResume();
        // 시작 버튼을 클릭하면
        binding.btnStart.setOnClickListener(v -> {
            authenticateduth = prefs.getString("accessToken", null);
            Log.d("Access_Token", authenticateduth != null ? authenticateduth : "토큰 널임");

            if (authenticateduth == null){
                showAlert();
            }else{
                // 액세스 있으면 저장해서 사용
                AccessToken.getInstance().setAccessToken(authenticateduth);
                userInfo = new UserInfo();
                userInfo.getUserInfo(getApplicationContext(), new UserInfo.UserInfoCallback() {
                    @Override
                    public void onSuccess() {
                        startSelectActivity();
                    }
                    @Override
                    public void onError(String message) {
                        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }

    private void checkPermissionsAgain() {
        // 모든 필요한 권한을 다시 확인합니다.
        boolean allPermissionsGranted = true;
        for (String permission : permissionsNeeded) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                // 하나라도 권한이 승인되지 않았다면
                allPermissionsGranted = false;
                break;
            }
        }

        if (!allPermissionsGranted) {
            // 권한이 여전히 승인되지 않았다면 적절한 조치를 취합니다.
            // 예를 들어, 사용자에게 권한이 필요한 이유를 다시 설명하거나, 앱을 종료할 수 있습니다.
            Toast.makeText(this, "필요한 모든 권한이 승인되지 않았습니다.", Toast.LENGTH_LONG).show();
            finish(); // 앱을 종료
        }
    }
    @Override
    protected void onStop() {
        super.onStop();
        // 액티비티가 멈출 때 리시버 등록을 해제
        unregisterReceiver(networkUtil);
    }

    private void startSelectActivity() {
        Intent intent = new Intent(MainActivity.this, SelectActivity.class);
        startActivity(intent);
    }

    private void setupRotaryInputListener(ScrollView scrollView) {
        scrollView.setOnGenericMotionListener(new View.OnGenericMotionListener() {
            @Override
            public boolean onGenericMotion(View v, MotionEvent ev) {
                if (ev.getAction() == MotionEvent.ACTION_SCROLL &&
                        ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)) {
                    float delta = -ev.getAxisValue(MotionEventCompat.AXIS_SCROLL) *
                            ViewConfigurationCompat.getScaledVerticalScrollFactor(
                                    ViewConfiguration.get(v.getContext()), v.getContext());

                    int scrollAmount = Math.round(delta * 10); // 스크롤 양 조정
                    scrollView.scrollBy(0, scrollAmount);
                    return true;
                }
                return false;
            }
        });
    }

    private AlertDialog showDialogWithRotaryInput(View dialogView, ScrollView scrollView) {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setView(dialogView);
        builder.setCancelable(false);

        AlertDialog dialog = builder.create();
        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
        }

        dialog.show();

        setupRotaryInputListener(scrollView);
        scrollView.requestFocus();

        return dialog;
    }


}
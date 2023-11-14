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
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.dallim.databinding.ActivityMainBinding;
import com.dallim.util.AccessToken;
import com.dallim.util.NetworkUtil;
import com.dallim.util.PreferencesUtil;
import com.dallim.util.UserInfo;

import java.util.ArrayList;
import java.util.List;

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

        // 리시버 인스턴스를 생성합니다.
        networkUtil = new NetworkUtil();

        // 알림을 사용하기 위한 코드(오레오 이상 버전이면 실행)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            /*새로운 알림 채널 생성
             * id : 채널의 아이디
             * name : 사용자에게 보여지는 채널 이름
             * 채널의 중요도 설정
             * */
            NotificationChannel serviceChannel = new NotificationChannel(
                    "dallim_channel",
                    "달림 알림",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            // 시스템에서 매니저를 가져와서 할당
            NotificationManager manager = getSystemService(NotificationManager.class);
            // 매니저를 사용해서 알림 채널을 시스템에 등록한다.
            manager.createNotificationChannel(serviceChannel);
        }

        // 바인딩 클래스를 사용해서 xml코드를 객체화시킨다. findViewById를 안 쓰고 바인딩 클래스로 편하게 사용.
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        // xml 레이아웃의 최상위 뷰를 가져옴
        View view = binding.getRoot();
        // 액티비티의 컨텐츠 뷰로 view를 설정. 여기서 화면에 뭐가 보일지 결정
        setContentView(view);

        checkPermission();

        PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
        boolean isPowerSaveMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP && powerManager.isPowerSaveMode();
        boolean isIgnoringBatteryOptimizations = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && powerManager.isIgnoringBatteryOptimizations(getPackageName());

        if (isPowerSaveMode) {
            // Code to show an alert dialog that informs the user that the main activity is blocked while in power save mode
            AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
            builder.setTitle("절전 모드 감지");
            builder.setMessage("정확한 위치 추적을 위해 절전 모드를 해제하고 어플을 다시 실행해주세요.");
            builder.setPositiveButton("설정으로 이동", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    // 사용자가 OK 버튼을 클릭했을 때 절전 모드 설정 화면으로 이동
                    Intent intent;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
                        intent = new Intent(Settings.ACTION_BATTERY_SAVER_SETTINGS);
                    } else {
                        // 이전 버전의 안드로이드에서는 절전 모드 설정을 직접 열 수 없으므로 일반 설정 화면으로 이동
                        intent = new Intent(Settings.ACTION_SETTINGS);
                    }
                    startActivity(intent);
                    finish();
                }
            });
            builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialogInterface) {
                    // 대화 상자가 닫힐 때 액티비티를 종료
                    finish();
                }
            });
            AlertDialog dialog = builder.create();
            dialog.show();
        }
        if (!isIgnoringBatteryOptimizations) {
            System.out.println("최적화모드 아님");
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
        new AlertDialog.Builder(this)
                .setTitle("달림 모바일 연동")
                .setMessage("달림을 사용하기 위해서는 인증이 필요합니다.")
                .setPositiveButton("인증하기", (dialog, which) -> {
                    // 인증 액티비티로 이동하는 인텐트 실행
                    Intent intent = new Intent(MainActivity.this, AuthActivity.class);
                    startActivity(intent);
                })
                .setNegativeButton("취소", (dialog, which) -> dialog.dismiss())
                .create().show();
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
        } else {
            // 모든 권한이 승인되었습니다. 앱의 다음 흐름으로 넘어갑니다.
            continueAppFlow();
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

    // 앱의 다음 흐름으로 넘어가는 메서드
    private void continueAppFlow() {
        // 모든 권한이 승인된 후에 해야 할 작업을 여기에 구현합니다.
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
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

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
        } else {
            // 모든 권한이 승인되었다면, 앱의 흐름을 계속 진행합니다.
            continueAppFlow();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
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
}
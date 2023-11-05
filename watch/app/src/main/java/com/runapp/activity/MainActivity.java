package com.runapp.activity;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.runapp.R;
import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivityMainBinding;
import com.runapp.dto.response.ApiResponseDTO;
import com.runapp.dto.response.UserInfoResponseDTO;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;
import com.runapp.util.NetworkUtil;
import com.runapp.util.PreferencesUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends ComponentActivity{
    // 클래스 멤버로 Executor 정의
    private final Executor executor = Executors.newSingleThreadExecutor();
    private ActivityMainBinding binding;
    private AppDatabase db;
    static int MULTIPLE_PERMISSIONS_CODE = 100;
    private SharedPreferences prefs;
    private NetworkUtil networkUtil;
    private int notificationId = 5;
    private String authenticateduth;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        db = AppDatabase.getDatabase(getApplicationContext());
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

        // 어떤 권한을 확인할 지 설정 해놓은 메서드.
        checkPermission();
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
        if (requestCode == Activity.RESULT_OK){
            startSelectActivity();
        }
    }


    private void checkPermission(){
        // 필요한 권한(퍼미션)들
        String[] requiredPermissions = {
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACTIVITY_RECOGNITION,
                Manifest.permission.BODY_SENSORS,
                Manifest.permission.ACCESS_BACKGROUND_LOCATION
        };

        // 거절되었거나 아직 수락하지 않은 권한(퍼미션)을 저장할 문자열 리스트
        List<String> rejectedPermissionList = new ArrayList<>();

        // 필요한 퍼미션들을 하나씩 끄집어내서 현재 권한을 받았는지 체크
        for (String permission : requiredPermissions) {
            // 특정 퍼미션을 확인하는데 값이 PERMISSION_GRANTED와 같지 않으면 권한이 없다는 뜻.
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                // 만약 권한이 없다면 rejectedPermissionList에 추가
                rejectedPermissionList.add(permission);
            }
        }

        // 거절 퍼미션 리스트가 비어있지 않다면
        if (!rejectedPermissionList.isEmpty()) {
            // 권한 요청!
            String[] array = new String[rejectedPermissionList.size()];
            array = rejectedPermissionList.toArray(array);
            // 현재 액티비티에서 요청권한 리스트에게 다시 재요청을 보냄.
            ActivityCompat.requestPermissions(this, array, MULTIPLE_PERMISSIONS_CODE);
        }
    }

    /*
    * 요청에 대한 사용자의 권한 응답(승인 or 거절)을 받으면 실행된다.
    * onRequestPermissionsResult는 프래그먼트에서 사용되길 권장한다.
    * 하지만 메인 액티비티에서 권한 확인을 받는 게 맞아보여서 액티비티에서 사용함.
    */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        // 요청 코드가 우리가 보낸 권한요청의 결과와 맞는지 확인한다.(100)
        if (requestCode == MULTIPLE_PERMISSIONS_CODE) {
            boolean allPermissionsGranted = true;
            // 모든 권한이 승인되었는지 확인
            for (int grantResult : grantResults) {
                // 하나라도 승인이 안 됐으면 false로 만들고 정지
                if (grantResult != PackageManager.PERMISSION_GRANTED) {
                    allPermissionsGranted = false;
                    break;
                }
            }

            // 승인이 안 됐으면
            if (!allPermissionsGranted) {
                Toast.makeText(
                        getApplicationContext(),
                        "설정에서 모든 권한을 허용하고 다시 실행해주세요.",
                        Toast.LENGTH_LONG
                ).show();

                // 설정창으로 이동
                Intent intent = new Intent();
                intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                Uri uri = Uri.fromParts("package", getPackageName(), null);
                intent.setData(uri);
                startActivity(intent);
                finish();

            } else {
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

        authenticateduth = prefs.getString("accessToken", null);
        Log.d("Access_Token", authenticateduth != null ? authenticateduth : "토큰 널임");

        // 시작 버튼을 클릭하면
        binding.btnStart.setOnClickListener(v -> {
            if (authenticateduth == null){
                showAlert();
            }else{
                // 액세스 있으면 저장해서 사용
                AccessToken.getInstance().setAccessToken(authenticateduth);
                getUserInfo();
            }
        });

        // 연동 해제 버튼
        binding.btnFinish.setOnClickListener(v ->{
            // 연동이 안됐으면
            if (authenticateduth == null){
                Toast toast = Toast.makeText(MainActivity.this, "연동된 계정이 없습니다.", Toast.LENGTH_SHORT);
                toast.setGravity(Gravity.CENTER, 0, 0);
                toast.show();
            }else { // 연동이 됐으면
                // AlertDialog.Builder 인스턴스 생성
                AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

                LayoutInflater inflater = getLayoutInflater();
                // unlink_user.xml을 가져와서 객체로 생성
                View customView = inflater.inflate(R.layout.unlink_user, null);

                builder.setView(customView);

                // builder 내용으로 AlertDialog 생성
                AlertDialog dialog = builder.create();

                // AlertDialog 보이기
                dialog.show();

                Button btnCancel = customView.findViewById(R.id.unlink_cancel);
                Button btnStart = customView.findViewById(R.id.unlink_start);

                // 취소 버튼에 대한 클릭 리스너
                btnCancel.setOnClickListener(b ->{
                    dialog.dismiss();
                });

                // 확인 버튼에 대한 클릭 리스너
                btnStart.setOnClickListener(b-> {
                    prefs.edit().remove("accessToken").apply();
                    Toast toast = Toast.makeText(MainActivity.this, "연동을 해제하였습니다.", Toast.LENGTH_SHORT);
                    toast.setGravity(Gravity.CENTER, 0, 0);
                    toast.show();
                    dialog.dismiss();
                });
            }
        });
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

    private void getUserInfo(){
        Call<ApiResponseDTO<UserInfoResponseDTO>> call = ApiUtil.getApiService().getUserInfo("Bearer " + authenticateduth);
        call.enqueue(new Callback<ApiResponseDTO<UserInfoResponseDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<UserInfoResponseDTO>> call, Response<ApiResponseDTO<UserInfoResponseDTO>> response) {
                if (response.isSuccessful() && response.body().getData() != null){
                    Log.d("성공", String.valueOf(response.body().getData().toString()));
                    SharedPreferences.Editor edit = prefs.edit();
                    edit.putString("nickname", response.body().getData().getNickname());
                    edit.putString("email", response.body().getData().getEmail());
                    edit.putLong("userId", response.body().getData().getUserId());
                    edit.putLong("characterIndex", response.body().getData().getCharacterIndex());
                    edit.putLong("planetIndex", response.body().getData().getPlanetIndex());
                    edit.putInt("level", response.body().getData().getLevel());
                    edit.apply();
                    startSelectActivity();
                } else {
                    Log.d("로그", response.body().getStatus());
                    Toast toast = Toast.makeText(MainActivity.this, "유저 정보를 가져오는데 실패했습니다.", Toast.LENGTH_SHORT);
                    toast.setGravity(Gravity.CENTER, 0, 0);
                    toast.show();
                }
            }

            @Override
            public void onFailure(Call<ApiResponseDTO<UserInfoResponseDTO>> call, Throwable t) {
                Toast toast = Toast.makeText(MainActivity.this, "서버 에러 발생", Toast.LENGTH_SHORT);
                toast.setGravity(Gravity.CENTER, 0, 0);
                toast.show();
            }
        });
    }
}

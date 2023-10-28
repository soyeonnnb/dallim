package com.runapp.util;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Looper;
import android.util.Log;

import androidx.core.app.ActivityCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.Task;

public class LocationHelper {

    private static final String TAG = "LocationHelper";
    private FusedLocationProviderClient fusedLocationProviderClient;
    private Context context;
    private Location lastLocation;

    public LocationHelper(Context context) {
        this.context = context;
        initLocationClient();
        initLocationCallback();
    }

    // 위치 관련 서비스를 초기화 시킴
    private void initLocationClient() {
        // 앱의 위치를 가져오는 데 사용됨.
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(context);

        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(1000); // 위치 업데이트 간격은 1초
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY); // 높은 정확도로 가져옴

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
                .addLocationRequest(locationRequest);
        SettingsClient client = LocationServices.getSettingsClient(context);
        Task<LocationSettingsResponse> task = client.checkLocationSettings(builder.build());
        task.addOnSuccessListener(locationSettingsResponse -> Log.d(TAG, "location client setting success"));
        task.addOnFailureListener(e -> Log.d(TAG, "location client setting failure"));
    }

    public void requestLastLocation() {
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        fusedLocationProviderClient.getLastLocation().addOnSuccessListener(location -> {
            if (location != null) {
                onLocationUpdated(location);
            }
        });
    }

    private LocationCallback locationCallback;

    private void initLocationCallback() {
        locationCallback = new LocationCallback() {
            // 위치 정보가 업데이트될 때마다 호출된다.
            @Override
            public void onLocationResult(LocationResult locationResult) {
                // null이면 콜백 종료
                if (locationResult == null) return;
                // 위치 정보 리스트를 순회한다.
                for (Location location : locationResult.getLocations()) {
                    // 위치 정보 업데이트 메서드 동작.
                    onLocationUpdated(location);
                    break;
                }
            }
        };
    }

    // 위치 정보 업데이트 메서드
    private void onLocationUpdated(Location location) {
        // 이전 위치가 null이 아니면
        if (lastLocation != null) {
            // 현재 위치와 이전 위치 사이의 거리를 미터로 계산한다.
            float distance = lastLocation.distanceTo(location);
            // 현재 속도를 m/s 단위로 가져온다.
            float speed = location.getSpeed();
            Log.d(TAG, "이동거리: " + distance + " M, 속도: " + speed + " m/s");
        }
        lastLocation = location;
    }

    public void startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(1000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
    }


}

package com.dallim;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    Log.d("DDDDDDDDDD", "MainActivity - getMainComponentName");
    return "Dallim";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    Log.d("DDDDDDDDDD", "MainActivity - createReactActivityDelegate");
    return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    Intent intent = getIntent();
    Log.d("DDDDDDDDDD", "MainActivity - getIntent "+intent.toString());
    Log.d("DDDDDDDDDD", "MainActivity - getIntent "+intent.getData());
    Log.d("DDDDDDDDDD", "MainActivity - getIntent "+intent.getDataString());

    Log.d("DDDDDDDDDD", "MainActivity - onCreate getIntent "+intent.hasExtra("route"));

    handleIntent(intent);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    Log.d("DDDDDDDDDD", "MainActivity - onNewIntent intent is null =>" +(intent!=null) +" 1 hasExtra => "+ intent.hasExtra("route"));

    Log.d("DDDDDDDDDD", "MainActivity - onNewIntent");
    setIntent(intent); // Optional: if you want to use getIntent() later
    Log.d("DDDDDDDDDD", "MainActivity - onNewIntent intent is null =>" +(intent!=null) +" 2 hasExtra => "+ intent.hasExtra("route"));

    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    Log.d("DDDDDDDDDD", "MainActivity - handleIntent intent is null =>" +(intent!=null) +" hasExtra => "+ intent.hasExtra("route"));
    if (intent != null && intent.hasExtra("route")) {
      String route = intent.getStringExtra("route");
      CalendarWidgetModule widgetModule = new CalendarWidgetModule((ReactApplicationContext) getReactInstanceManager().getCurrentReactContext());
      Log.d("DDDDDDDDDD", "MainActivity - handleIntent sendAppRoute");
      widgetModule.sendAppRoute(route);
    }
  }
}

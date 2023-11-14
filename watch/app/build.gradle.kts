plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.dallim"
    compileSdk = 34

    buildFeatures{
        viewBinding = true
        dataBinding = true
    }

    defaultConfig {
        applicationId = "com.dallim"
        minSdk = 30
        targetSdk = 33
        versionCode = 105
        versionName = "1.0.4"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    signingConfigs {
        create("ssafy") {
            storeFile = file("ssafy.jks")
            storePassword = "ssafy1234"
            keyAlias = "ssafy"
            keyPassword = "ssafy1234"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        getByName("debug"){
            isMinifyEnabled = false
            isDebuggable = true
            signingConfig = signingConfigs.getByName("ssafy")
            manifestPlaceholders["enableCrashlytics"] = "false"
            extra.set("alwaysUpdateBuildId", false)
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.4.3"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // android
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.5.1")
    implementation("androidx.activity:activity-ktx:1.8.0")
    implementation("androidx.fragment:fragment:1.4.0")
    implementation("androidx.preference:preference-ktx:1.2.1")
    // wear-os
    implementation("androidx.wear:wear:1.3.0")
    implementation("com.google.android.gms:play-services-wearable:18.1.0")
    implementation("androidx.percentlayout:percentlayout:1.0.0")
    implementation("androidx.legacy:legacy-support-v4:1.0.0")
    implementation("androidx.recyclerview:recyclerview:1.3.1")
    // compose
    implementation("androidx.compose:compose-bom:2023.01.00")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling:1.5.3")
    implementation("androidx.wear.compose:compose-material:1.2.0")
    implementation("androidx.wear.compose:compose-foundation:1.2.0")
    implementation("androidx.wear.compose:compose-navigation:1.2.0")
    implementation("androidx.activity:activity-compose:1.5.1")

    // viewPager2
    implementation("androidx.viewpager2:viewpager2:1.0.0")

    // 진행중인 사항을 사용자에게 보여줌
    implementation("androidx.wear:wear-ongoing:1.0.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.10.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("com.google.android.gms:play-services-location:21.0.1")

    // 이미지 라이브러리
    implementation("com.github.bumptech.glide:glide:4.12.0")
    annotationProcessor("com.github.bumptech.glide:compiler:4.12.0")
    // 원형 이미지뷰 라이브러리
    implementation("de.hdodenhof:circleimageview:3.1.0")

    // room
    implementation("androidx.room:room-runtime:2.5.0")
    annotationProcessor("androidx.room:room-compiler:2.5.0")

    implementation ("androidx.lifecycle:lifecycle-viewmodel:2.4.0") // ViewModel 의존성
    implementation ("androidx.lifecycle:lifecycle-livedata:2.4.0") // LiveData 의존성
    implementation ("androidx.lifecycle:lifecycle-runtime:2.4.0") // Lifecycle-runtime 의존성

    implementation("com.google.android.gms:play-services-fitness:21.1.0")
    implementation("com.google.android.gms:play-services-auth:20.7.0")

    // GSON
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.retrofit2:converter-scalars:2.9.0")

    // 암호화
    implementation("androidx.security:security-crypto-ktx:1.1.0-alpha06")

    // Brotli 디코더 라이브러리 추가
    implementation ("org.brotli:dec:0.1.2")

}
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import * as S from './Weather.styles';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Linking } from 'react-native';

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
};
const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData | null> => {
  const apiKey = '1280793a56c1419f31fdf1c5c1913c85';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // 오류 발생 시 null 반환
  }
};

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'Clear':
      return require('@/assets/icons/weather/Clear.png');
    case 'Clouds':
      return require('@/assets/icons/weather/Clouds.png');
    case 'Rain':
    case 'Drizzle':
      return require('@/assets/icons/weather/Rain.png');
    case 'Thunderstorm':
      return require('@/assets/icons/weather/Thunderstorm.png');
    case 'Snow':
      return require('@/assets/icons/weather/Snow.png');
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
      return require('@/assets/icons/weather/Dust.png');
    case 'Tornado':
    case 'Squall':
      return require('@/assets/icons/weather/Tornado.png');
    default:
      return require('@/assets/icons/weather/Clouds.png'); // Default 아이콘
  }
};

const openSettings = () => {
  Linking.openSettings().catch((err) => console.error('Cannot open settings', err));
};

export const AppSettingsButton = () => (
  <>
    <S.PermissionButton onPress={openSettings}>
      <S.WeatherText>위치 권한 요청 동의</S.WeatherText>
    </S.PermissionButton>
  </>
);

// 날씨 컴포넌트
function WeatherComponent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  // 권한 요청 함수
  const requestLocationPermission = async () => {
    const res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const isGranted = res === RESULTS.GRANTED;
    setIsPermissionDenied(!isGranted);
    return isGranted;
  };

  // 권한 요청 및 날씨 데이터 불러오기
  useEffect(() => {
    const checkPermissionsAndGetWeather = async () => {
      const isGranted = await requestLocationPermission();

      if (isGranted) {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const weather = await fetchWeather(latitude, longitude);
            setWeatherData(weather);
          },
          (error) => {
            console.error(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setIsPermissionDenied(true);
      }
    };
    checkPermissionsAndGetWeather();
  }, []);

  if (isPermissionDenied) {
    return (
      <S.Container>
        <AppSettingsButton />
      </S.Container>
    );
  }

  if (!weatherData) {
    return <S.Container>
      <S.WeatherText>
        날씨 불러오는중...
      </S.WeatherText>
    </S.Container>;
  }

  const weatherIcon = getWeatherIcon(weatherData.weather[0].main);

  return (
    <S.Container>
      <S.LeftBox>
        <S.ImageStyle source={weatherIcon} resizeMode='contain' />
      </S.LeftBox>

      <S.RightBox>
        <S.WeatherText>온도: {weatherData.main.temp}°C</S.WeatherText>
        <S.WeatherText>습도: {weatherData.main.humidity}%</S.WeatherText>
        <S.WeatherText>풍속: {weatherData.wind.speed} m/s</S.WeatherText>

      </S.RightBox>
    </S.Container>
  );
};

export default WeatherComponent;

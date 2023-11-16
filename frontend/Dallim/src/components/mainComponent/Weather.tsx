import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import * as S from './Weather.styles';

import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return res === RESULTS.GRANTED;
  } else {
    const res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return res === RESULTS.GRANTED;
  }
};

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
  const apiKey = 'null';
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


function WeatherComponent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    requestLocationPermission().then(isGranted => {
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
        console.log('Location permission denied');
      }
    });
  }, []);

  if (!weatherData) {
    return <S.Container><S.WeatherText>날씨 불러오는중...</S.WeatherText></S.Container>;
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

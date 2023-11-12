// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';

// 나중에 분리 예정 : 단일책임원칙

const {TokenModule} = NativeModules;

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    // console.log('내 토큰이다~!! : ' + token);

    // 네이티브 모듈을 사용해 Android SharedPreferences에 토큰 저장
    await TokenModule.setToken(token);
    return token;
  } catch (error) {
    console.error('???Error fetching token:', error);
    throw error;
  }
};

const BASE_URL = 'https://k9b208.p.ssafy.io';

// 유저 정보 조회
export const fetchUserProfile = async () => {
  const accessToken = await getToken(); // getToken 함수를 사용하여 accessToken을 가져옴
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/main`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log('MainApi : 정보 조회 Axios 성공');
    return response.data.data;
  } catch (error) {
    console.log('MainApi : 정보 조회 Axios 실패');
    throw error;
  }
};

// 출석 조회
export const fetchUserCalendar = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/attendance`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log('MainApi : 출석 조회 Axios 성공');
    return response.data.data;
  } catch (error) {
    console.log('MainApi : 정보 조회 Axios 실패');
    throw error;
  }
};

interface RunningRecordInfo {
  second: number;
  latitude: number;
  longitude: number;
  distance: number;
  speed: number;
  pace: number;
}

interface RunningData {
  initLatitude: number;
  initLongitude: number;
  watchOrMobile: string;
  userId: number;
  characterId: number;
  type: string;
  rivalRecord: number | null;
  runningRecordInfos: RunningRecordInfo[];
  totalTime: number;
  totalDistance: number;
  averageSpeed: number;
  createdAt: string;
}

// 혼자 달리기 데이터 보내기
export const postRunningData = async (runningData: RunningData) => {
  const accessToken = await getToken();
  const url = `${BASE_URL}/api/v1/running`;

  try {
    const response = await axios.post(url, runningData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('RunningApi 성공 : ', response.data);
    return response.data;
  } catch (error) {
    console.error('RunningApi 실패 ', error);
    throw error;
  }
};

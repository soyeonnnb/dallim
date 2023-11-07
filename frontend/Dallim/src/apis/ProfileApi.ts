// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

const BASE_URL = 'https://k9b208.p.ssafy.io';

export const fetchUserProfileCard = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/profile/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('response : ', response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 프로필 조회 Axios 실패 --> ', error); // 로깅을 추가합니다.
    throw error;
  }
};

export const fetchCompetitorCard = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/running-mate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 내가등록한 경쟁자 조회 실패 --> ', error); // 로깅을 추가합니다.
    throw error;
  }
};

export const patchNicknameCheck = async (nickname: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/user/nickname`,
      {nickname}, // 이 부분이 변경됩니다.
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('response : ', response.data);
    return response.data;
  } catch (error) {
    console.error('ProfileApi : 닉네임 중복체크 axios 실패 --> ', error);
    throw error;
  }
};

export const postAlarmRegist = async (scheduleTimestamp: number) => {
  const accessToken = await getToken();
  const fcmToken = await AsyncStorage.getItem('fcmToken');

  const body = {
    targetToken: fcmToken,
    scheduleTime: scheduleTimestamp.toString(),
  };

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/schedule`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Header에 AccessToken을 포함시킵니다.
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('ProfileApi : 알림 등록 axios 실패 -->', error);
  }
};
// 워치 연동 API
export const postWatchConnection = async (authCode: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/check-authentication-code`,
      {authCode},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('response : ', response.data);
    return response.data;
  } catch (error) {
    console.error('ProfileApi : 워치연동 axios 실패 --> ', error);
    throw error;
  }
};

export const fetchScheduleList = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/schedule`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 스케줄 불러오기--> ', error); // 로깅을 추가합니다.
    throw error;
  }
};

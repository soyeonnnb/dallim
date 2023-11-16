// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 나중에 분리 예정 : 단일책임원칙
const getAcessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

const getFcmToken = async () => {
  try {
    const token = await AsyncStorage.getItem('fcmToken');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

// const BASE_URL = 'https://k9b208.p.ssafy.io';
const BASE_URL = 'https://dallim.site';

export const postFcmToken = async () => {
  const accessToken = await getAcessToken();
  const fcmToken = await getFcmToken();

  try {
    const response = await axios.post(
      `${BASE_URL}/api/fcm-token`,
      {
        fcmToken: fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('fcmToken 전송 Axios 성공');
      return true;
    } else {
      console.log('fcmToken 전송 Axios 실패');
      return false;
    }
  } catch (error) {
    console.error('fcmToken 전송 Axios 에러', error);
    throw error;
  }
};

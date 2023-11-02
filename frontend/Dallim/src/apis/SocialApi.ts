// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 나중에 분리 예정 : 단일책임원칙
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

// 주간 랭킹 조회 ( 전체 )
export const fetchAllRank = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/all-ranking`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(
      'SocialApi : 주간 랭킹 조회 ( 전체 ) 조회 Axios 성공 :' +
        response.data.data,
    );
    return response.data.data;
  } catch (error) {
    console.log('SocialApi : 주간 랭킹 조회 ( 전체 ) 조회 Axios 실패');
    throw error;
  }
};

// 주간 랭킹 조회 ( 친구 )
export const fetchFriendRank = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/follow-ranking`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(
      'SocialApi : 주간 랭킹 조회 ( 친구 ) 조회 Axios 성공 :' +
        response.data.data,
    );
    return response.data.data;
  } catch (error) {
    console.log('SocialApi : 주간 랭킹 조회 ( 친구 ) 조회 Axios 실패');
    throw error;
  }
};

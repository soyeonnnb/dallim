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

// 캐릭터 & 행성 정보 조회
export const fetchEditInfo = async () => {
  const accessToken = await getToken(); // getToken 함수를 사용하여 accessToken을 가져옴
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/edit`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('EditApi : 캐릭터 & 행성 조회 Axios 성공');
    console.log('response : ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('EditApi :  캐릭터 & 행성 조회 Axios 실패');
    throw error;
  }
};
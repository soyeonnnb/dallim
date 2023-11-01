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

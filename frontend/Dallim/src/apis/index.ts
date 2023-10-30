import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export * from './Example';

export * from './LoginApi';
export * from './ChartApi';
export * from './EditApi';
export * from './MainApi';
export * from './ProfileApi';
export * from './SocialApi';

const BASE_URL = 'https://k9b208.p.ssafy.io';

const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레시 토큰을 요청하는 함수
const postRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await privateApi.post('/api/token/refresh', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Axios 인스턴스에 인터셉터 추가
privateApi.interceptors.response.use(
  response => {
    return response; // 정상 응답일 경우 바로 반환
  },
  async error => {
    const { config } = error;

    if (error.response.status === 401) {
      const originRequest = config;

      try {
        const response = await postRefreshToken();
        const newAccessToken = response.headers['authorization'];

        // AsyncStorage를 사용하여 액세스 토큰 및 리프레시 토큰 저장
        await AsyncStorage.setItem('accessToken', newAccessToken);
        await AsyncStorage.setItem(
          'refreshToken',
          response.headers['authorization-refresh']
        );

        // Axios의 기본 헤더에 액세스 토큰 설정
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 수정된 originRequest로 Axios 요청 재시도
        return axios(originRequest);
      } catch (err) {
        // AsyncStorage에서 토큰 제거
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        throw err; // 오류를 상위로 전파
      }
    }
    return Promise.reject(error);
  }
);

export { privateApi };

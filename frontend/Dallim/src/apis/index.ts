import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export * from './Example';
export * from './ChartApi';
export * from './EditApi';
export * from './LoginApi';
export * from './MainApi';
export * from './ProfileApi';
export * from './SocialApi';

const BASE_URL = 'https://j9b203.p.ssafy.io';

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
    // console.log("response");
    // 정상 응답일 경우 바로 반환
    return response;
  },

  // async error => {
  //   const {config} = error;
  //   if (error.response.status === 401) {
  //     const originRequest = config;
  //     try {
  //       const response = await postRefreshToken();
  //       const newAccessToken = response.headers['authorization'];
  //       console.log(newAccessToken, 'newAccessToken');

  //       // AsyncStorage를 사용하여 액세스 토큰 및 리프레시 토큰 저장
  //       await AsyncStorage.setItem('accessToken', newAccessToken);
  //       await AsyncStorage.setItem(
  //         'refreshToken',
  //         response.headers['authorization-refresh'],
  //       );

  //       // Axios의 기본 헤더에 액세스 토큰 설정
  //       axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  //       originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //       console.log('토큰 재발급 완료');

  //       // 수정된 originRequest로 Axios 요청 재시도
  //       return axios(originRequest);
  //     } catch {
  //       console.log('catch 에러');

  //       // AsyncStorage에서 토큰 제거
  //       await AsyncStorage.removeItem('accessToken');
  //       await AsyncStorage.removeItem('refreshToken');
  //     }
  //   }
  //   return Promise.reject(error);
  // },
);

export {privateApi};

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export * from './Example';
// export * from './LoginApi';
// export * from './ChartApi';
// export * from './EditApi';
// export * from './MainApi';
// export * from './ProfileApi';
// export * from './SocialApi';

const BASE_URL = 'https://k9b208.p.ssafy.io';

const privateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청이 서버로 전송되기 전에 실행
privateApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('token' + token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: 응답을 받은 후 실행
privateApi.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = error.response.data.accessToken;
        await AsyncStorage.setItem('accessToken', newToken);
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return await privateApi.request(error.config);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    return Promise.reject(error);
  },
);

export {privateApi};

// // 시환이꺼 토큰 (임시)
// privateApi.interceptors.request.use(
//   async config => {
//     // 토큰을 받아오는 로직을 변경합니다.
//     let token;
//     try {
//       const response = await axios.post(`${BASE_URL}/api/v1/user/token`, {
//         email: 'pum001@naver.com',
//       });
//       if (response.data.status === 'success') {
//         token = response.data.data;
//       }
//     } catch (error) {
//       console.error('Error fetching the token:', error);
//     }

// AsyncStorage 데이터 확인
// const retrieveStoredData = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     const id = await AsyncStorage.getItem('userId');

//     console.log('Stored Access Token:', accessToken);
//   } catch (error) {
//     console.error('Error retrieving data from AsyncStorage:', error);
//   }
// };
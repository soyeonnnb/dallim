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

// 행성 구입
export const postPlanetPurchase = async (planetIndex: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/planet/`,
      {planetIndex: planetIndex},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('EditApi : 행성 업데이트 Axios 성공');
    return response.data;
  } catch (error) {
    console.log('EditApi : 행성 업데이트 Axios 실패');
    throw error;
  }
};

// 캐릭터 구입
export const postCharacterPurchase = async (characterIndex: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/character/`,
      {characterIndex: characterIndex},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('EditApi : 캐릭터 업데이트 Axios 성공');
    return response.data;
  } catch (error) {
    console.log('EditApi : 캐릭터 업데이트 Axios 실패');
    throw error;
  }
};

// 대표 행성 수정
export const updateEquippedPlanet = async (planetIndex: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/planet`,
      {planetIndex: planetIndex},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('EditApi : 대표 행성 변경 Axios 성공');
    return response.data;
  } catch (error) {
    console.log('EditApi : 대표 행성 변경 Axios 실패');
    throw error;
  }
};

// 대표 캐릭터 수정
export const updateEquippedCharacter = async (characterIndex: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.patch( 
      `${BASE_URL}/api/v1/character`,
      {characterIndex: characterIndex},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('EditApi : 대표 캐릭터 변경 Axios 성공');
    return response.data;
  } catch (error) {
    console.log('EditApi : 대표 캐릭터 변경 Axios 실패');
    throw error;
  }
};
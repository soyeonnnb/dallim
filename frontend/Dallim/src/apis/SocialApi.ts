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
    // console.error('Error fetching token:', error);
    throw error;
  }
};

// const BASE_URL = 'https://k9b208.p.ssafy.io';
const BASE_URL = 'https://dallim.site';

// 주간 랭킹 조회 ( 전체 )
export const fetchAllRank = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/all-ranking`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(
    //   'SocialApi : 주간 랭킹 조회 ( 전체 ) Axios 성공 ' + response.data.data,
    // );
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 주간 랭킹 조회 ( 전체 ) 조회 Axios 실패');
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
    // console.log('SocialApi : 주간 랭킹 조회 ( 친구 ) Axios 성공 ');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 주간 랭킹 조회 ( 친구 ) Axios 실패');
    throw error;
  }
};

// 유저 달림기록 가져오기 ( Index )
export const fetchUserRecord = async (userId: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log('SocialApi : 유저 기록 조회 Axios 성공');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 유저 기록 조회 Axios 실패');
    throw error;
  }
};

// 런닝 메이트 등록
export const postRecordSave = async (id: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/running-mate`,
      {
        objectId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('SocialApi : 런닝메이트 등록 성공');
    } else {
      // console.log('SocialApi : 런닝메이트 등록 실패');
    }
  } catch (error) {
    // console.error('런닝메이트 등록 오류', error);
    throw error;
  }
};

// 유저 달림기록 가져오기 ( Index )
export const fetchCompare = async (userId: number) => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/compare/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log('SocialApi : 비교 데이터 조회 Axios 성공 ');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 비교 데이터 조회 Axios 실패');
    throw error;
  }
};

// 유저 친구 목록 가져오기
export const fetchFriendList = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/follow`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log('SocialApi : 친구 목록 조회 Axios 성공 ');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 친구 목록 조회 Axios 실패');
    throw error;
  }
};

// 유저 검색
export const fetchUserSearch = async (word: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/search?`, {
      params: {q: word},
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(
    //   'SocialApi : 유저 조회 Axios 성공 :' + JSON.stringify(response.data.data),
    // );
    // console.log('SocialApi : 유저 조회 Axios 성공');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 유저 조회 Axios 실패');
    throw error;
  }
};

// 친구 추가
export const postAddFriend = async (userid: number): Promise<boolean> => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/follow`,
      {
        toUserId: userid,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('SocialApi : 친구 요청 성공');
      return true;
    } else {
      // console.log('SocialApi : 친구 요청 실패');
      return false;
    }
  } catch (error) {
    // console.error('친구 요청 오류', error);
    throw error;
  }
};

// 친구 삭제
export const deleteFriend = async (userid: number): Promise<boolean> => {
  const accessToken = await getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/follow/${userid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('SocialApi : 친구 삭제 성공');
      return true;
    } else {
      // console.log('SocialApi : 친구 삭제 실패');
      return false;
    }
  } catch (error) {
    // console.error('친구 삭제 오류', error);
    throw error;
  }
};

// 친구 대기 목록 조회
export const fetchFriendWaitList = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/follow/waiting`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log('SocialApi : 친구 대기 목록 Axios 성공 ');
    return response.data.data;
  } catch (error) {
    // console.log('SocialApi : 친구 대기 목록 Axios 실패');
    throw error;
  }
};

// 친구신청 수락
export const postRequestAccept = async (userid: number): Promise<boolean> => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/follow/accept`,
      {
        toUserId: userid,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('SocialApi : 친구신청 수락 요청 성공');
      return true;
    } else {
      // console.log('SocialApi : 친구신청 수락 요청 실패');
      return false;
    }
  } catch (error) {
    // console.error('친구신청 수락 요청 오류', error);
    throw error;
  }
};

// 친구신청 거절
export const postRequestReject = async (userid: number): Promise<boolean> => {
  const accessToken = await getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/follow/reject`,
      {
        toUserId: userid,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success' && response.data.data === true) {
      // console.log('SocialApi : 친구신청 거절 요청 성공');
      return true;
    } else {
      // console.log('SocialApi : 친구신청 거절 요청 실패');
      // console.log('고칠거에요~~~~~~~~');
      return false;
    }
  } catch (error) {
    // console.error('친구신청 거절 요청 오류', error);
    throw error;
  }
};

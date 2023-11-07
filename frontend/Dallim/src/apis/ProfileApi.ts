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

export const deleteRunningMate = async (
  competitorId: string,
): Promise<boolean> => {
  const accessToken = await getToken();
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/running-mate/${competitorId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success' && response.data.data === true) {
      console.log('ProfileApi : 런닝메이트 삭제 성공');
      return true;
    } else {
      console.log('ProfileApi : 런닝메이트 삭제 실패');
      return false;
    }
  } catch (error) {
    console.error('런닝메이트 삭제 오류', error);
    throw error;
  }
};

export const postSchedule = async (
  selectedDays: string[],
  hour: number,
  minute: number,
) => {
  const accessToken = await getToken();
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(selectedDays);
  console.log(hour);
  console.log(minute);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/schedule`,
      {
        targetToken: fcmToken,
        day: selectedDays,
        hour: hour,
        minute: minute,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('ProfileApi : 알림등록하기 성공 ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 알림 등록하기--> ', error);
    throw error;
  }
};

// 혹시 api 수정(알림 삭제)
// export const deleteSchedule = async (
//   selectedDays: string[],
//   hour: number,
//   minute: number,
// ) => {
//   const accessToken = await getToken();
//   const fcmToken = await AsyncStorage.getItem('fcmToken');

//   console.log('무슨날: ' + selectedDays);
//   console.log('시: ' + hour);
//   console.log('분: ' + minute);

//   try {
//     const response = await axios.delete(`${BASE_URL}/api/v1/schedule`, {
//       params: {
//         day: selectedDays,
//         hour: hour,
//         minute: minute,
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     console.log('ProfileApi : 스케줄 삭제 성공', response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error('ProfileApi : 스케줄 삭제 실패', error);
//     throw error;
//   }
// };

export const deleteScheduleTwo = async (
  selectedDays: string[],
  hour: number,
  minute: number,
) => {
  const accessToken = await getToken();

  console.log('무슨날: ' + selectedDays);
  console.log('시: ' + hour);
  console.log('분: ' + minute);

  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/schedule`, {
      data: {
        // 본문에 데이터를 포함시킵니다.
        day: selectedDays,
        hour: hour,
        minute: minute,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('ProfileApi : 스케줄 삭제 성공', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 스케줄 삭제 실패', error);
    throw error;
  }
};

export const patchSchedule = async (
  selectedDays: string[],
  hour: number,
  minute: number,
  state: boolean,
) => {
  const accessToken = await getToken();

  console.log(`무슨날: ${selectedDays}`);
  console.log(`시: ${hour}`);
  console.log(`분: ${minute}`);
  console.log(`이게 true야 false야: ${state}`);

  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/schedule`,
      {
        day: selectedDays,
        hour: hour,
        minute: minute,
        state: state,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('ProfileApi : 알람 활성화 요청 성공', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('ProfileApi : 알람 활성화 실패');
    throw error;
  }
};

import {privateApi} from './Index';
// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___ 

// 유저 정보 조회 
export const fetchUserProfile = async () => {
  try {
    const response = await privateApi.get(`/api/v1/user/main`);
    console.log('Main : 정보 조회 Axios 성공');
    console.log('response : ' + response);
    return response.data;
  } catch (error) {
    console.log('Main : 정보 조회 Axios 실패');
    throw error;
  }
};

// 출석 조회
export const fetchUserCalendar = async () => {
  try {
    const response = await privateApi.get(`/api/v1/attendance`);
    console.log('Main : 출석 조회 Axios 성공');
    return response.data;
  } catch (error) {
    console.log('Main : 출석 조회 Axios 실패');
    throw error;
  }
};

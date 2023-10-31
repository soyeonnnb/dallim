// API CONVENTION ( 카멜케이스 )
// CREATE : post____
// READ   : featch____
// Update : update____
// Delete : delete___

// CRUD 예시
import {privateApi} from './Index';

// 등록 예시
export const postBBTITResult = async (memberId: number, bbtiList: string[]) => {
  try {
    const response = await privateApi.post('/api/bbti/regist', {
      memberId,
      bbtiList,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 조회 예시
export const fetchRecodeList = async (memberId: number) => {
  try {
    const response = await privateApi.get(`api/record/view-list/${memberId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 수정 예시
type UpdatedDataType = {
  title : string;
  content : string;
  startDate : string;
  endDate : string;
};
export const updateBBTITResult = async (bbtitId: number, updatedData: UpdatedDataType) => {
  try {
    const response = await privateApi.put(`/api/bbti/update/${bbtitId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 삭제 예시
export const deleteRecode = async (recordId: number) => {
  try {
    const response = await privateApi.delete(`api/record/delete/${recordId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

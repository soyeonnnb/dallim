import {privateApi} from './Index';

export const fetchUserProfile = async () => {
  try {
    const response = await privateApi.get(`/api/v1/user/profile/me`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

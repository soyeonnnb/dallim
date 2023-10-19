import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestWithTokenRefresh = async (
  requestCallback: () => Promise<any>,
) => {
  try {
    const response = await requestCallback();
    return response;
  } catch (error: any) {
    if (error.response && error.response.data.accessToken) {
      const newToken = error.response.data.accessToken;
      AsyncStorage.setItem('accessToken', newToken);
      console.log('뭐야뭐야' + newToken);

      return requestCallback();
    } else {
      throw error;
    }
  }
};

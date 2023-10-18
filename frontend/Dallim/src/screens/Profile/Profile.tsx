import React, {useState} from 'react';
import {Button, Modal} from 'react-native';
import * as S from './Profile.styles'; // 스타일 컴포넌트 import
import {requestWithTokenRefresh} from '../../apis/requestWithTokenRefresh ';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

interface ProfileProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const Profile = ({navigation}: ProfileProps) => {
  const [logoutUrl, setLogoutUrl] = useState(null); // 로그아웃 URL 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 창의 상태

  const handleConfirmLogout = () => {
    AsyncStorage.getItem('accessToken').then(token => {
      console.log('엑세스토큰 웨얼?', token);

      // token 값을 이용하여 로그아웃 요청을 보냅니다.
      requestWithTokenRefresh(() => {
        return axios.post(
          'http://10.0.2.2:8080/api/oauth/social/logout',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token, // 이전에 검색한 토큰을 사용합니다.
            },
            withCredentials: true,
          },
        );
      })
        .then(response => {
          console.log(response);
          if (response.data.logoutUrl) {
            setLogoutUrl(response.data.logoutUrl);
            setModalVisible(true);
          } else if (response.data.naver) {
            navigation.navigate('BottomTab', {
              screen: 'Main',
            });
          }
          AsyncStorage.removeItem('accessToken'); // 액세스 토큰 제거
          for (let key in AsyncStorage) {
            if (key.startsWith('persist:')) {
              AsyncStorage.removeItem(key);
            }
          }
        })
        .catch(error => {
          console.log('통신에러발생', error);
        });
    });
  };

  return (
    <S.Container>
      <S.Title>Profile Screen</S.Title>
      <Button
        title="Go back to Main"
        onPress={() => navigation.navigate('Main')}
      />
      <Button title="로그아웃" onPress={handleConfirmLogout} />
      {logoutUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false); // 모달을 닫을 때 상태를 업데이트합니다.
          }}>
          <WebView source={{uri: logoutUrl}} />
        </Modal>
      )}
    </S.Container>
  );
};

export default Profile;

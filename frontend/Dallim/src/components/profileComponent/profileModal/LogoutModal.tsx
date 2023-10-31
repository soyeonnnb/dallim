import React, {useState} from 'react';
import {Modal} from 'react-native';
import * as S from './LogoutModal.styles';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {requestWithTokenRefresh} from '@/apis/requestWithTokenRefresh ';
import WebView from 'react-native-webview';

type ModalComponentProps = {
  showModal: boolean;
  toggleModal: () => void;
};

const LogoutModal = ({showModal, toggleModal}: ModalComponentProps) => {
  const navigation = useNavigation();

  const [logoutUrl, setLogoutUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    console.log('로그인아웃 버튼 눌림!');
    AsyncStorage.getItem('accessToken').then(token => {
      AsyncStorage.getAllKeys()
        .then(keys => {
          console.log('저장된 모든 키:', keys);
        })
        .catch(error => {
          console.log('키를 가져오는 중 오류 발생:', error);
        });

      requestWithTokenRefresh(() => {
        return axios.post(
          'http://10.0.2.2:8080/api/oauth/social/logout',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
            withCredentials: true,
          },
        );
      })
        .then(response => {
          console.log('뭐라고 나올까');

          console.log(response.data);

          console.log(response.data.logoutUrl);
          if (response.data.logoutUrl) {
            setLogoutUrl(response.data.logoutUrl);
            setModalVisible(true);
          } else if (response.data.naver) {
            // navigation.navigate('Main');
            AsyncStorage.removeItem('accessToken'); // 액세스 토큰 제거
            AsyncStorage.removeItem('userId');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
            toggleModal();
          }
        })
        .catch(error => {
          console.log('통신에러발생', error);
        });
    });

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: 'Login'}],
    //   }),
    // );

    // toggleModal();
  };

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={showModal}>
        <S.ModalContainer>
          <S.ModalContent>
            <S.ModalHeader>
              <S.TitleBox>
                <S.TitleText>로그아웃 하시겠습니까?</S.TitleText>
              </S.TitleBox>
            </S.ModalHeader>
            <S.ModalFooter>
              <S.ModalButton onPress={handleConfirm}>
                <S.ModalButtonText>확인</S.ModalButtonText>
              </S.ModalButton>
              <S.ModalCancelButton onPress={toggleModal}>
                <S.ModalButtonText>취소</S.ModalButtonText>
              </S.ModalCancelButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalContainer>
      </Modal>
      {logoutUrl && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false); // 모달을 닫을 때 상태를 업데이트합니다.
          }}>
          <WebView
            source={{
              uri: logoutUrl,
              headers: {
                'Accept-Language': 'ko-KR,ko',
              },
            }}
            onNavigationStateChange={navState => {
              console.log(navState.url);
              if (navState.url === 'http://10.0.2.2:8080/api/oauth/logout') {
                setModalVisible(false);
                AsyncStorage.removeItem('accessToken');
                AsyncStorage.removeItem('userId');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  }),
                );
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default LogoutModal;

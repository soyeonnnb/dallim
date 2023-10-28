import React, { useState } from 'react';
import { Button, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import { requestWithTokenRefresh } from 'src/apis/requestWithTokenRefresh ';

const Logout = ({ navigation }: any) => {
    const [logoutUrl, setLogoutUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirmLogout = () => {
        AsyncStorage.getItem('accessToken').then(token => {
            AsyncStorage.getAllKeys()
                .then(keys => {
                    console.log('저장된 모든 키:', keys);
                    console.log('키값');
                })
                .catch(error => {
                    console.log('키를 가져오는 중 오류 발생:', error);
                });

            // token 값을 이용하여 로그아웃 요청을 보냅니다.
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
                    console.log(response.data);
                    console.log(response.data.logoutUrl);
                    console.log(response.data.logoutUrl);
                    if (response.data.logoutUrl) {
                        setLogoutUrl(response.data.logoutUrl);
                        setModalVisible(true);
                    } else if (response.data.naver) {
                        navigation.navigate('Main');
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
        <>
            <Button title="로그아웃" onPress={handleConfirmLogout} />
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
                            if (navState.url.includes('logout_success')) {
                                setModalVisible(false); // WebView 모달을 닫습니다.
                                navigation.navigate('Main'); // 로그아웃 후 Login 페이지로 이동합니다.
                            }
                        }}
                    />
                </Modal>
            )}
        </>
    );
};

export default Logout;

import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import * as S from './FriendListModal.styles';
import CloseIcon from '../../../assets/icons/CloseIcon.png';
import NoFriendImage from '../../../assets/images/NoFriend.png';
import NoSearchImage from '../../../assets/images/NoSearch.png';
import SearchIcon from '../../../assets/icons/SearchIcon.png';
import FriendBox from '../FriendBox';
import SearchBox from '../SearchBox';

type Props = {
    isVisible: boolean;
    onClose: () => void;
};

const FriendListModal: React.FC<Props> = ({ isVisible, onClose }) => {

    const [isOn, setIsOn] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const toggleHandle = () => {
        setIsOn(prevIsOn => {
            Animated.timing(animatedValue, {
                toValue: prevIsOn ? 0 : 70,
                duration: 100,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
            return !prevIsOn;
        });
    };

    function handleSend() {
        console.log("닉네임 전송!");
    };

    // Temp Data
    const Friend = true; // 친구가 있는 경우
    // const Friend = false; // 친구가 없는 경우
    const User = true; // 유저가 있는 경우
    // const User = false; // 유저가 없는 경우

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.Top>
                        <S.Empty></S.Empty>
                        <S.ToggleButtonWrapper onPress={toggleHandle}>
                            <S.ToggleButton
                                style={{
                                    transform: [
                                        {
                                            translateX: animatedValue,
                                        },
                                    ],
                                }}
                            >
                                <S.ToggleButtonText >{isOn ? "유저 검색" : "친구 목록"}</S.ToggleButtonText>
                            </S.ToggleButton>
                        </S.ToggleButtonWrapper>
                        <S.CloseButton onPress={onClose}>
                            <S.CloseImage source={CloseIcon} />
                        </S.CloseButton>
                    </S.Top>
                    <S.Middle>
                        {isOn ? (
                            User ? (
                                <SearchBox />
                            ) : (
                                <>
                                    <S.Image source={NoSearchImage} resizeMode="contain" />
                                    <S.Text>검색된 유저가 없어요.</S.Text>
                                    <S.Text style={{ marginTop: 5 }}>정확한 유저의 닉네임을 입력해주세요.</S.Text>
                                </>
                            )
                        ) : (
                            Friend ? (
                                <FriendBox />
                            ) : (
                                <>
                                    <S.Image source={NoFriendImage} resizeMode="contain" />
                                    <S.Text style={{ marginRight: 10 }}>친구가 없어요.</S.Text>
                                </>
                            )
                        )}
                    </S.Middle>
                    {isOn && (
                        <S.Bottom>
                            <S.BottomLeft>
                                <S.SearchIcon source={SearchIcon} />
                            </S.BottomLeft>
                            <S.BottomMiddle>
                                <S.SearchBox
                                    placeholder="닉네임을 입력해주세요."
                                />
                            </S.BottomMiddle>
                            <S.BottomRight>
                                <S.SendButton onPress={handleSend}>
                                    <S.SendButtonText>검색</S.SendButtonText>
                                </S.SendButton>
                            </S.BottomRight>
                        </S.Bottom>)}
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default FriendListModal;

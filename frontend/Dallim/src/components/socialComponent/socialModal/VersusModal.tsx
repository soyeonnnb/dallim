
import React from 'react';
import { Modal } from 'react-native';
import * as S from './VersusModal.styles';

const BackgroundImage = require('../../../assets/images/VersusBackground.png');


interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const VersusModal: React.FC<Props> = ({ isVisible, onClose }) => {

    const MyCharacterImage = require('../../../assets/character/병아리_선택.png');
    const MyNickName = "나는야 펭소";
    const OtherCharacterImage = require('../../../assets/character/팬더_선택.png');
    const OtherNickname = "배고픈 하마";

    // 임시 데이터
    const MyDay = 12;
    const OtherDay = 10;
    const MyTime = 60;
    const OtherTime = 30;
    const MyDist = 25;
    const OtherDist = 50;
    const MySpeed = 15;
    const OtherSpeed = 20;

    const computeRate = (myValue: number, otherValue: number) => {
        const totalValue = myValue + otherValue;
        return {
            myRate: (myValue / totalValue) * 100,
            otherRate: (otherValue / totalValue) * 100
        };
    };

    const dayRates = computeRate(MyDay, OtherDay);
    const timeRates = computeRate(MyTime, OtherTime);
    const distRates = computeRate(MyDist, OtherDist);
    const speedRates = computeRate(MySpeed, OtherSpeed);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.Top>
                        <S.Title>VS</S.Title>
                    </S.Top>
                    <S.Middle>
                        <S.MiddleBackground source={BackgroundImage} >
                            <S.MiddleLeft>
                                <S.CharacterImage source={MyCharacterImage} />
                                <S.NicknameText>{MyNickName}</S.NicknameText>
                            </S.MiddleLeft>
                            <S.MiddleRigth>
                                <S.CharacterImage source={OtherCharacterImage} />
                                <S.NicknameText>{OtherNickname}</S.NicknameText>
                            </S.MiddleRigth>
                        </S.MiddleBackground>
                    </S.Middle>
                    <S.Bottom>
                        <S.BottomBox>
                            <S.BottomText>출석</S.BottomText>
                            <S.RateBarBox>
                                <S.MyDataBar widthPercentage={dayRates.myRate} />
                                <S.OtherDataBar widthPercentage={dayRates.otherRate} />
                            </S.RateBarBox>
                        </S.BottomBox>
                        <S.BottomBox>
                            <S.BottomText>시간</S.BottomText>
                            <S.RateBarBox>
                                <S.MyDataBar widthPercentage={timeRates.myRate} />
                                <S.OtherDataBar widthPercentage={timeRates.otherRate} />
                            </S.RateBarBox>
                        </S.BottomBox>
                        <S.BottomBox>
                            <S.BottomText>거리</S.BottomText>
                            <S.RateBarBox>
                                <S.MyDataBar widthPercentage={distRates.myRate} />
                                <S.OtherDataBar widthPercentage={distRates.otherRate} />
                            </S.RateBarBox>
                        </S.BottomBox>
                        <S.BottomBox>
                            <S.BottomText>속도</S.BottomText>
                            <S.RateBarBox>
                                <S.MyDataBar widthPercentage={speedRates.myRate} />
                                <S.OtherDataBar widthPercentage={speedRates.otherRate} />
                            </S.RateBarBox>
                        </S.BottomBox>
                    </S.Bottom>
                    <S.Close>
                        <S.CloseBox>
                            <S.CloseButton onPress={onClose}>
                                <S.SendButtonText>닫기</S.SendButtonText>
                            </S.CloseButton>
                        </S.CloseBox>
                    </S.Close>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default VersusModal;

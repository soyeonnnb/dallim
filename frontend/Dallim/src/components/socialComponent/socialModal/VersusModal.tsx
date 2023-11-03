
import React from 'react';
import { Modal } from 'react-native';
import * as S from './VersusModal.styles';
import { characterData } from '@/recoil/CharacterData';

const backgroundImage = require('@/assets/images/VersusBackground.png');


interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const VersusModal: React.FC<Props> = ({ isVisible, onClose }) => {

    const myNickName = "나는야 펭소";
    const myCharacterIndex = 2;
    const myEvolutionStage = 0;
    const myLevel = 12;
    const myDay = 12;
    const myTime = 60;
    const myDistance = 25;
    const mySpeed = 15;
    const myCharacterImage = characterData[myCharacterIndex].evolutions[myEvolutionStage].front;

    const pairNickname = "배고픈 하마";
    const pairCharacterIndex = 3;
    const pairEvolutionStage = 0;
    const pairLevel = 21;
    const pairDay = 10;
    const pairTime = 30;
    const pairDistance = 50;
    const pairSpeed = 20;
    const pairCharacterImage = characterData[pairCharacterIndex].evolutions[pairEvolutionStage].front;

    const computeRate = (myValue: number, otherValue: number) => {
        const totalValue = myValue + otherValue;
        return {
            myRate: (myValue / totalValue) * 100,
            otherRate: (otherValue / totalValue) * 100
        };
    };

    const dayRates = computeRate(myDay, pairDay);
    const timeRates = computeRate(myTime, pairTime);
    const distRates = computeRate(myDistance, pairDistance);
    const speedRates = computeRate(mySpeed, pairSpeed);

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
                        <S.MiddleBackground source={backgroundImage} resizeMode='cover'>
                            <S.MiddleLeft>
                                <S.CharacterImage source={myCharacterImage} resizeMode='contain'/>
                                <S.NicknameText>{myNickName}</S.NicknameText>
                            </S.MiddleLeft>
                            <S.MiddleRigth>
                                <S.CharacterImage source={pairCharacterImage} resizeMode='contain'/>
                                <S.NicknameText>{pairNickname}</S.NicknameText>
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

import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './SocialHeader.styles';
import FriendListModal from './socialModal/FriendListModal';
import QuestionIcon from '../../assets/icons/QuestionIcon.png';
import AwesomeAlert from 'react-native-awesome-alerts';

function SocialHeader() {

    const NowDate = new Date();
    const nowTimestamp = NowDate.getTime();
    const DateYear = NowDate.getFullYear();

    const startOfYear = new Date(NowDate.getFullYear(), 0, 1);
    const startOfYearTimestamp = startOfYear.getTime();
    const daysPassedSinceStartOfYear = Math.floor((nowTimestamp - startOfYearTimestamp) / (24 * 60 * 60 * 1000));

    // 1월 1일이 속한 주를 첫째 주로 간주
    const daysFromStartWeek = startOfYear.getDay(); // 0 (일요일) ~ 6 (토요일)
    const adjustedDaysPassed = daysPassedSinceStartOfYear + daysFromStartWeek;

    const DateWeek = Math.ceil(adjustedDaysPassed / 7);

    const [showAlert, setShowAlert] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <S.Container>
            <S.Header>
                <S.HeaderLeft>
                    <S.DateText>{DateYear}년 {DateWeek}주차 랭킹</S.DateText>
                </S.HeaderLeft>
                <S.HeaderRight>
                    <S.ManageButton onPress={() => setModalVisible(true)}>
                        <S.ManageText>친구관리</S.ManageText>
                    </S.ManageButton>
                </S.HeaderRight>

            </S.Header>
            <S.Body>
                <S.BodySideBox></S.BodySideBox>
                <S.BodyBox>
                    <S.RankText>RANKING</S.RankText>
                </S.BodyBox>
                <S.BodySideBox>
                    <TouchableOpacity onPress={() => setShowAlert(true)}>
                        <S.QuestionImage source={QuestionIcon} />
                    </TouchableOpacity>
                </S.BodySideBox>
            </S.Body>

            <FriendListModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="안내사항"
                // message={isOn ? "친구 거리 기준 랭킹입니다." : "상위 20명의 거리 기준 랭킹입니다."}
                message={"상위 20명의 거리 기준 랭킹입니다."}
                closeOnTouchOutside={true}
                onDismiss={() => {
                    setShowAlert(false);
                }}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="확인"
                confirmButtonColor="blue"
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />

        </S.Container>
    );
};

export default SocialHeader;

import * as S from './Profile.styles';
import React, { useState, useEffect } from 'react';

import ProfileCard from '../../components/profileComponent/ProfileCard';

import NicknameChangeModal from '../../components/profileComponent/profileModal/NicknameChangeModal';
import LogoutModal from '../../components/profileComponent/profileModal/LogoutModal';
import { characterData } from '@/recoil/CharacterData';

//icon
import logoutIcon from '@/assets/icons/logout.png';
import TagsIcon from '@/assets/icons/TagsIcon';
import RunningMateIcon from '@/assets/icons/RunningMateIcon';
import RunningAlarmIcon from '@/assets/icons/RunningAlarmIcon';
import WatchIcon from '@/assets/icons/WatchIcon';

//Apis
import { fetchUserProfileCard } from '@/apis/ProfileApi';
import { fetchCompetitorCard } from '@/apis/ProfileApi';

//Toast
import Toast from 'react-native-toast-message';

//Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  equippedPlanetIndexState,
  userExpState,
  userLevelState,
  userNicknameState,
} from '@/recoil/UserRecoil';
import { competitorDataState } from '@/recoil/RunningRecoil';

interface ProfileProps {
  navigation: any;
}

function Profile({ navigation }: ProfileProps) {
  //State---------------------------------

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);

  const [userNickname, setUserNickname] = useRecoilState(userNicknameState); // 유저 닉네임
  const userLevel = useRecoilValue(userLevelState);
  const userExp = useRecoilValue(userExpState);
  const equippedCharacterIndex = useRecoilValue(equippedCharacterIndexState);
  const equippedEvolutionStage = useRecoilValue(equippedEvolutionStageState);
  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState);

  const [competitorData, setCompetitorData] = useRecoilState(competitorDataState);

  //useEffect---------------------------------

  useEffect(() => {
    const fetchCompetitorData = async () => {
      try {
        const data = await fetchCompetitorCard();
        setCompetitorData(data); // Recoil 상태를 업데이트합니다.
      } catch (error) {
        console.error('경쟁자 데이터 불러오기 에러 :', error);
      }
    };
    fetchCompetitorData();
  }, [setCompetitorData]);

  //dataCall ---------------------------------
  const selectedCharacter = characterData[equippedCharacterIndex];
  const selectedCharacterLevelData = selectedCharacter.evolutions[equippedEvolutionStage];

  //actions---------
  const handleRunningMatePress = () => {
    if (competitorData.length === 0) {
      // 데이터가 없을 때의 동작
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '등록된 러닝메이트가 없습니다!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
    } else {
      // 데이터가 있을 때의 동작
      navigation.navigate('RunningMateSetting', {
        competitorData: competitorData,
      });
    }
  };

  // 개발중
  // const handleToastTouch = () => {
  //   Toast.show({
  //     type: 'error',
  //     position: 'top',
  //     text1: '개발중입니다!',
  //     visibilityTime: 3000,
  //     autoHide: true,
  //     topOffset: 10,
  //   });
  // };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.TitleProfileBox>
            <S.Text>마이페이지</S.Text>
            <S.DeleteButtonBox onPress={() => setShowLogoutModal(true)}>
              <S.Logout source={logoutIcon} />
            </S.DeleteButtonBox>
          </S.TitleProfileBox>
          <S.ProfileBox>
            <ProfileCard
              PlanetIndex={equippedPlanetIndex}
              Nickname={userNickname}
              UserLevel={userLevel}
              experiencePercentage={userExp}
            />
          </S.ProfileBox>
        </S.Header>

        <S.Body>
          <S.SetBox>
            <S.ButtonContainer>
              <S.ButtonBox onPress={() => setShowNicknameChangeModal(true)}>
                <S.IconBox>
                  <TagsIcon width={50} height={50} color="white"></TagsIcon>
                </S.IconBox>
                <S.EmptyBox></S.EmptyBox>
                <S.TextBox>
                  <S.ButtonText>닉네임 변경</S.ButtonText>
                </S.TextBox>
              </S.ButtonBox>
              <S.ButtonBox onPress={handleRunningMatePress}>
                <S.RunningIconBox>
                  <RunningMateIcon width={50} height={50} color="white" />
                </S.RunningIconBox>
                <S.TextBox>
                  <S.ButtonText>러닝메이트</S.ButtonText>
                </S.TextBox>
              </S.ButtonBox>
            </S.ButtonContainer>
            <S.ButtonContainer>
              <S.ButtonBox onPress={() => navigation.navigate('RunningAlarm')}>
                <S.AlarmIconBox>
                  <RunningAlarmIcon width={50} height={50} color="white" />
                </S.AlarmIconBox>
                <S.TextBox>
                  <S.ButtonText>운동알림</S.ButtonText>
                </S.TextBox>
              </S.ButtonBox>
              <S.ButtonBox
                onPress={() => navigation.navigate('WatchConnection')}>
                <S.WatchIconBox>
                  <WatchIcon width={50} height={50} color="white" />
                </S.WatchIconBox>
                <S.TextBox>
                  <S.ButtonText>워치</S.ButtonText>
                </S.TextBox>
              </S.ButtonBox>
            </S.ButtonContainer>
          </S.SetBox>
        </S.Body>

        <S.TabBox />
      </S.BackgroundImage>

      <S.ImageBox>
        <S.CharacterImage
          source={selectedCharacterLevelData.front}
          resizeMode="contain"
        />
      </S.ImageBox>

      <LogoutModal
        showModal={showLogoutModal}
        toggleModal={() => setShowLogoutModal(!showLogoutModal)}
      />

      <NicknameChangeModal
        showModal={showNicknameChangeModal}
        toggleModal={() => setShowNicknameChangeModal(!showNicknameChangeModal)}
        Nickname={userNickname}
      />
    </S.Container>
  );
}

export default Profile;

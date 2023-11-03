import * as S from './Profile.styles';
import React, {useState, useEffect} from 'react';
import ChangeNicknameIcon from '../../assets/icons/ChangeNicknameIcon.png';
import ManageRunningMateIcon from '../../assets/icons/ManageRunningMateIcon.png';
import NotificationIcon from '../../assets/icons/NotificationIcon.png';
import LogoutIcon from '../../assets/icons/LogoutIcon.png';

import ProfileCard from '../../components/profileComponent/ProfileCard';
// import Logout from "../../components/profileComponent/Logout";

import NicknameChangeModal from '../../components/profileComponent/profileModal/NicknameChangeModal';
import RunningMateModal from '../../components/profileComponent/profileModal/RunningMateModal';
import NotificationModal from '../../components/profileComponent/profileModal/NotificationModal';
import LogoutModal from '../../components/profileComponent/profileModal/LogoutModal';
import RunningMateSetting from './ProfileSubScreens/RunningMateSetting';
import {characterData} from '@/recoil/CharacterData';

//Apis
import {fetchUserProfileCard} from '@/apis/ProfileApi';
import {fetchCompetitorCard} from '@/apis/ProfileApi';

//Toast
import Toast from 'react-native-toast-message';

interface ProfileProps {
  navigation: any;
}

function Profile({navigation}: ProfileProps) {
  //State---------------------------------
  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    planetIndex: 0,
    characterIndex: 0,
    nickname: '',
    level: 0,
    exp: 0,
    evolutionStage: 0,
  });

  const [competitorData, setCompetitorData] = useState([]);

  //useEffect---------------------------------
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await fetchUserProfileCard();
        setUserData(data);
      } catch (error) {
        console.error('데이터 불러오기 에러 :', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchCompetitorData = async () => {
      try {
        const data = await fetchCompetitorCard();
        setCompetitorData(data);
      } catch (error) {
        console.error('경쟁자 데이터 불러오기 에러 :', error);
      }
    };

    fetchCompetitorData();
  }, []);

  //dataCall ---------------------------------
  const selectedCharacter = characterData[userData.characterIndex];
  const selectedCharacterLevelData =
    selectedCharacter.evolutions[userData.evolutionStage];

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
      navigation.navigate('RunningMateSetting');
    }
  };

  const handleToastTouch = () => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: '개발중입니다!',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 10,
    });
  };
  //
  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.TitleProfileBox>
            <S.Text>마이페이지</S.Text>
          </S.TitleProfileBox>
          <S.ProfileBox>
            <ProfileCard
              PlanetIndex={userData.planetIndex}
              Nickname={userData.nickname}
              UserLevel={userData.level}
              experiencePercentage={userData.exp}
            />
          </S.ProfileBox>
        </S.Header>

        <S.Body>
          <S.TitleSetBox>
            <S.Text>설정</S.Text>
          </S.TitleSetBox>

          <S.SetBox>
            {/* <S.ButtonBox onPress={() => setShowNicknameChangeModal(true)}>
              <S.IconBox>
                <S.ButtonIcon source={ChangeNicknameIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>닉네임 변경</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox> */}
            <S.ButtonBox onPress={handleToastTouch}>
              <S.IconBox>
                <S.ButtonIcon source={ChangeNicknameIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>닉네임 변경</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            {/* <S.ButtonBox onPress={handleRunningMatePress}>
              <S.IconBox>
                <S.ButtonIcon source={ManageRunningMateIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>러닝메이트 관리</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox> */}
            <S.ButtonBox onPress={handleToastTouch}>
              <S.IconBox>
                <S.ButtonIcon source={ManageRunningMateIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>러닝메이트 관리</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.ButtonBox onPress={() => navigation.navigate('RunningAlarm')}>
              <S.IconBox>
                <S.ButtonIcon source={NotificationIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>운동 알림 설정</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            {/* <S.ButtonBox onPress={handleToastTouch}>
              <S.IconBox>
                <S.ButtonIcon source={NotificationIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>운동 알림 설정</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox> */}

            <S.DeleteButtonBox onPress={() => setShowLogoutModal(true)}>
              <S.IconBox>
                <S.ButtonIcon source={LogoutIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>로그아웃</S.ButtonText>
              </S.TextBox>
            </S.DeleteButtonBox>
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

      <NicknameChangeModal
        showModal={showNicknameChangeModal}
        toggleModal={() => setShowNicknameChangeModal(!showNicknameChangeModal)}
        Nickname={userData.nickname}
      />
      {/* <RunningMateModal
        showModal={showRunningMateModal}
        toggleModal={() => setShowRunningMateModal(!showRunningMateModal)}
      /> */}
      <NotificationModal
        showModal={showNotificationModal}
        toggleModal={() => setShowNotificationModal(!showNotificationModal)}
      />
      <LogoutModal
        showModal={showLogoutModal}
        toggleModal={() => setShowLogoutModal(!showLogoutModal)}
      />
    </S.Container>
  );
}

export default Profile;

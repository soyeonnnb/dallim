import * as S from './Profile.styles'
import { useState } from 'react'
import ChangeNicknameIcon from '../../assets/icons/ChangeNicknameIcon.png'
import ManageRunningMateIcon from '../../assets/icons/ManageRunningMateIcon.png'
import NotificationIcon from '../../assets/icons/NotificationIcon.png'
import LogoutIcon from '../../assets/icons/LogoutIcon.png'

import ProfileCard from '../../components/profileComponent/ProfileCard'
// import Logout from "../../components/profileComponent/Logout";

import NicknameChangeModal from '../../components/profileComponent/profileModal/NicknameChangeModal'
import RunningMateModal from '../../components/profileComponent/profileModal/RunningMateModal'
import NotificationModal from '../../components/profileComponent/profileModal/NotificationModal'
import LogoutModal from '../../components/profileComponent/profileModal/LogoutModal'

function Profile() {

  // 임시 데이터
  const RoomIndex = 2;
  const CharacterIndex = 1;
  const Nickname = "펭소시치";
  const UserLevel = 54;
  const experiencePercentage = 65.2;

  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);
  const [showRunningMateModal, setShowRunningMateModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('../../assets/images/MainBackground3.png')}
        resizeMode="cover">
        <S.Header>
          <S.TitleProfileBox>
            <S.Text>My Profile</S.Text>
          </S.TitleProfileBox>
          <S.ProfileBox>
            <ProfileCard RoomIndex={RoomIndex} CharacterIndex={CharacterIndex} Nickname={Nickname} UserLevel={UserLevel} experiencePercentage={experiencePercentage} />
          </S.ProfileBox>
        </S.Header>

        <S.Body>
          <S.TitleSetBox>
            <S.Text>Setting</S.Text>
          </S.TitleSetBox>

          <S.SetBox>
            <S.ButtonBox onPress={() => setShowNicknameChangeModal(true)}>
              <S.IconBox>
                <S.ButtonIcon source={ChangeNicknameIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>닉네임 변경</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.ButtonBox onPress={() => setShowRunningMateModal(true)}>
              <S.IconBox>
                <S.ButtonIcon source={ManageRunningMateIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>러닝메이트 관리</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.ButtonBox onPress={() => setShowNotificationModal(true)}>
              <S.IconBox>
                <S.ButtonIcon source={NotificationIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>운동 알림 설정</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

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

      <NicknameChangeModal showModal={showNicknameChangeModal} toggleModal={() => setShowNicknameChangeModal(!showNicknameChangeModal)} Nickname={Nickname} />
      <RunningMateModal showModal={showRunningMateModal} toggleModal={() => setShowRunningMateModal(!showRunningMateModal)} />
      <NotificationModal showModal={showNotificationModal} toggleModal={() => setShowNotificationModal(!showNotificationModal)} />
      <LogoutModal showModal={showLogoutModal} toggleModal={() => setShowLogoutModal(!showLogoutModal)} />

    </S.Container>
  );
};

export default Profile;

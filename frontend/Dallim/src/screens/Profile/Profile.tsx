import * as S from './Profile.styles'
import ChangeNicknameIcon from '../../assets/icons/ChangeNicknameIcon.png'
import ManageRunningMateIcon from '../../assets/icons/ManageRunningMateIcon.png'
import NotificationIcon from '../../assets/icons/NotificationIcon.png'
import LogoutIcon from '../../assets/icons/LogoutIcon.png'

import ProfileCard from '../../components/profileComponent/ProfileCard'
// import Logout from "../../components/profileComponent/Logout";


function Profile() {

  // 임시 데이터
  const RoomIndex = 4;
  const CharacterIndex = 1;
  const Nickname = "펭소시치";
  const UserLevel = 54;
  const experiencePercentage = 65.2;

  function button_A() {
    console.log("닉네임 변경 버튼이 눌렸습니다.")
  }
  function button_B() {
    console.log("러닝메이트 버튼이 눌렸습니다.")
  }
  function button_C() {
    console.log("운동 알림 버튼이 눌렸습니다.")
  }
  function button_D() {
    console.log("로그아웃 버튼이 눌렸습니다.")
  }

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
            <S.ButtonBox onPress={button_A}>
              <S.IconBox>
                <S.ButtonIcon source={ChangeNicknameIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>닉네임 변경</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.ButtonBox onPress={button_B}>
              <S.IconBox>
                <S.ButtonIcon source={ManageRunningMateIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>러닝메이트 관리</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.ButtonBox onPress={button_C}>
              <S.IconBox>
                <S.ButtonIcon source={NotificationIcon} />
              </S.IconBox>
              <S.TextBox>
                <S.ButtonText>운동 알림 설정</S.ButtonText>
              </S.TextBox>
            </S.ButtonBox>

            <S.DeleteButtonBox onPress={button_D}>
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
    </S.Container>
  );
};

export default Profile;

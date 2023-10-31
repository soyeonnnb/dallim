import * as S from './RunningMateSetting.styles';
import {useState} from 'react';

//icon
import BackButtonIcon from '../../assets/icons/BackButtonIcon.png';

//img
// import Red

function RunningMateSetting() {
  // 임시 데이터
  const PlanetIndex = 2; // 유저가 장착한 행성
  const TempSelectCharacter = 3; // 유저가 장착한 캐릭터
  const TempSelectCharacterLevel = 1; // 유저가 장착한 캐릭터 레벨 : 0 OR 1
  // const selectedCharacter = characterData[TempSelectCharacter];
  // const selectedCharacterLevelData =
  //   selectedCharacter.levels[TempSelectCharacterLevel];

  const Nickname = '펭소시치'; // 유저 닉네임
  const UserLevel = 54; // 유저 레벨
  const experiencePercentage = 65.2; // 유저 해당하는 레벨의 경험치

  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);
  // const [showRunningMateModal, setShowRunningMateModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('../../assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.BackButtonIconBox>
            <S.BackButtonIcon source={BackButtonIcon}></S.BackButtonIcon>
          </S.BackButtonIconBox>
          <S.TitleRunningMateSettingBox>
            <S.TitleText>러닝메이트 설정</S.TitleText>
          </S.TitleRunningMateSettingBox>
          {/* <S.ProfileBox>
            <ProfileCard
              PlanetIndex={PlanetIndex}
              Nickname={Nickname}
              UserLevel={UserLevel}
              experiencePercentage={experiencePercentage}
            />
          </S.ProfileBox> */}
        </S.Header>

        {/* <S.Body>
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
          </S.SetBox>
        </S.Body> */}

        <S.TabBox />
      </S.BackgroundImage>

      {/* <S.ImageBox>
        <S.CharacterImage
          source={selectedCharacterLevelData.front}
          resizeMode="contain"
        />
      </S.ImageBox> */}
    </S.Container>
  );
}

export default RunningMateSetting;

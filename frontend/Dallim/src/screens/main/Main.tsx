import * as S from './Main.styles';
import React, { useState } from 'react';
import StampWhiteIcon from '@/assets/icons/StampWhiteIcon.png';
import StampModal from '@/components/mainComponent/StampModal';
import SpinAnimation from '@/components/common/SpinAnimation';
import { characterData } from '@/components/common/CharacterData';
import planetSample from '@/assets/planets/PlanetBlack.png';
import CustomToast from '@/components/common/CustomToast';

function Main() {

  const TempPoint = '3000'; // 유저 포인트
  const TempLv = '67'; // 유저 레벨
  const TempNickname = '하늘을 나는 병아리'; // 유저 닉네임
  const TempSelectCharacter = 0; // 유저가 장착한 캐릭터
  const TempSelectCharacterLevel = 1; // 유저가 장착한 캐릭터 레벨 : 0 OR 1   
  const selectedCharacter = characterData[TempSelectCharacter];
  const selectedCharacterLevelData = selectedCharacter.levels[TempSelectCharacterLevel];

  const [isStampModalVisible, setStampModalVisible] = useState(false);

  function handleSend() {
    console.log("출석체크 버튼 눌림!");
    setStampModalVisible(true);
  };

  function Start() {
    console.log("시작 버튼 눌림!");
    CustomToast({ type: "error", text1: "아직 개발중입니다." });
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.HeaderLeft>
            
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.PointText>{TempPoint} P</S.PointText>
          </S.HeaderRight>
        </S.Header>

        <S.StampBox>
          <S.Stamp>
            <S.SendButton onPress={handleSend}>
              <S.StampImage source={StampWhiteIcon} />
            </S.SendButton>
          </S.Stamp>
        </S.StampBox>

        <S.Body>
          <S.ThemeBox>
            <SpinAnimation>
              <S.StyledImage source={planetSample} />
            </SpinAnimation>
            <S.StyledGif source={selectedCharacterLevelData.running} resizeMode="contain" />
          </S.ThemeBox>
        </S.Body>

        <S.Footer>
          <S.FooterBox>
            <S.LevelText>Lv. {TempLv}</S.LevelText>
            <S.NicknameText>{TempNickname}</S.NicknameText>
          </S.FooterBox>

          <S.StartBox>
            <S.StartButton onPress={Start}>
              <S.StartText >시작하기</S.StartText>
            </S.StartButton>
          </S.StartBox>

        </S.Footer>

        <S.TabBox />
      </S.BackgroundImage>

      <StampModal
        isVisible={isStampModalVisible}
        onClose={() => setStampModalVisible(false)}
      />

    </S.Container>
  );
}

export default Main;

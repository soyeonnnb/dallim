import React, { useEffect, useState } from 'react';
import * as S from './CharacterEdit.styles';
import CharacterBox from './CharacterBox';
import AwesomeAlert from 'react-native-awesome-alerts';

type CharacterEditProps = {
  onCharacterChange: (index: number) => void;
  characterIndex: number;
}

function CharacterEdit({ onCharacterChange, characterIndex }: CharacterEditProps) {

  const SelectText = '친구를 선택하세요';
  const Level = '10';
  const Experience = 40;
  const experiencePercentage = (Experience / 100) * 100;

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(characterIndex);

  useEffect(() => {
    console.log("대표 캐릭터가 바꼈어요 : " + selectedCharacterIndex);
  }, [selectedCharacterIndex]);

  function handleCharacterChange(index: number) {
    console.log(index + "번째 캐릭터가 눌렸습니다!")
    setSelectedCharacterIndex(index);
    onCharacterChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  useEffect(() => {
    setSelectedCharacterIndex(characterIndex);
  }, [characterIndex]);

  const [showAlert, setShowAlert] = useState(false);

  function confirmCharacterChange() {
    setShowAlert(false);
    handleCharacterChange(selectedCharacterIndex % 4);
  }

  return (
    <S.Container>
      <S.Top>
        <S.TitleBox>
          <S.SelectText>{SelectText}</S.SelectText>
        </S.TitleBox>
      </S.Top>
      <S.Body>
        <S.CharacterBox>
          <CharacterBox index={characterIndex} />
        </S.CharacterBox>
      </S.Body>
      <S.Bottom>
        <S.ButtonBox onPress={() => setShowAlert(true)}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>
        <S.ButtomLevel>
          <S.LevelText>Level {Level}</S.LevelText>
          <S.LevelBox>
            <S.ExperienceBar percentage={experiencePercentage}></S.ExperienceBar>
          </S.LevelBox>
        </S.ButtomLevel>
      </S.Bottom>

      <AwesomeAlert
        show={showAlert}
        title="캐릭터 선택"
        message="정말로 이 캐릭터를 선택하시겠습니까?"

        // AwesomeAlert 라이브러리 특성 상 취소랑 확인을 임의로 바꿔서 사용하겠습니다.
        confirmText="취소"
        cancelText="확인"
        onConfirmPressed={() => setShowAlert(false)} // 기능 변경
        onCancelPressed={confirmCharacterChange} // 기능 변경
        showConfirmButton={true}
        showCancelButton={true}

        contentContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 15, // 둥글게 만들기 위한 설정
        }}
        confirmButtonStyle={{ backgroundColor: '#E36F6F' }} // 확인 버튼 배경색 변경
        cancelButtonStyle={{ backgroundColor: '#315182' }} // 취소 버튼 배경색 변경
      />
    </S.Container>
  );
};

export default CharacterEdit;
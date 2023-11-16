import * as S from './CharacterEdit.styles';
import {characterData} from '@/recoil/data/CharacterData';
import {useEffect, useState} from 'react';
import CharacterPurchaseCheckModal from './editModal/CharacterPurchaseCheckModal';
import CharacterSelectModal from './editModal/CharacterSelectModal';
import {CustomToast} from '@/components/common/toast/CustomToast';

import Character from './CharacterBox';

import {useRecoilState} from 'recoil';
import {
  userDataState,
  equippedCharacterIndexState,
  // equippedCharacterLevelState,
  // equippedEvolutionStageState,
  selectedCharacterIndexState,
  selectedCharacterLevelState,
  // selectedEvolutionStageState,
  selectedCharacterExpState,
  selectedCharacterIsPurchasedState,
  userPointState,
} from '@/recoil/UserRecoil';
import {postCharacterPurchase, updateEquippedCharacter} from '@/apis/EditApi';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import {colors} from '../common/globalStyles';

type CharacterEditProps = {
  handleEquippedCharacterChange: (index: number) => void;
  onCharacterChange: (index: number) => void;
  onCharacterPurchased: (index: number, cost: number) => void;
};

function CharacterEdit({
  handleEquippedCharacterChange,
  onCharacterChange,
  onCharacterPurchased,
}: CharacterEditProps) {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(
    equippedCharacterIndexState,
  );
  // const [equippedCharacterLevel, setEquippedCharacterLevel] = useRecoilState(equippedCharacterLevelState);
  // const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(equippedEvolutionStageState);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(
    selectedCharacterIndexState,
  );
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useRecoilState(
    selectedCharacterLevelState,
  );
  // const [selectedEvolutionStage, setSelectedEvolutionStage] = useRecoilState(selectedEvolutionStageState);
  const [selectedCharacterExp, setSelectedCharacterExp] = useRecoilState(
    selectedCharacterExpState,
  );
  const [selectedCharacterIsPurchased, setSelectedCharacterIsPurchased] =
    useRecoilState(selectedCharacterIsPurchasedState);
  const [characterSelectModalVisible, setCharacterSelectModalVisible] =
    useState(false); // 캐릭터 선택 확인 모달
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // 구매 확인 모달
  // const [showConfetti, setShowConfetti] = useState(false);

  async function equippedCharacterChange() {
    toggleCharacterSelectModal();
    const characterCount = characterData.length;
    onCharacterChange(selectedCharacterIndex % characterCount);

    try {
      const responseData = await updateEquippedCharacter(
        selectedCharacterIndex,
      );
      if (responseData.status === 'success') {
        CustomToast({type: 'success', text1: '대표 캐릭터 변경 성공!'});
      } else {
        CustomToast({type: 'error', text1: '통신에 실패했습니다.'});
      }
    } catch (error) {
      CustomToast({type: 'error', text1: '변경에 실패했습니다.'});
    }
  }

  function toggleCharacterSelectModal() {
    setCharacterSelectModalVisible(!characterSelectModalVisible);
  }

  function handlePurchaseCheck() {
    setPurchaseModalVisible(true);
  }
  async function handlePurchaseConfirm() {
    if (userPoint >= 4000) {
      try {
        const responseData = await postCharacterPurchase(
          selectedCharacterIndex,
        );
        if (responseData.status === 'success' && responseData.data === true) {
          setTimeout(() => {
            onCharacterPurchased(selectedCharacterIndex, 4000);

            setSelectedCharacterIsPurchased(true);
            setSelectedCharacterIndex(selectedCharacterIndex);
            setEquippedCharacterIndex(selectedCharacterIndex);
          }, 500);

          if (userData) {
            const newUserData = {
              ...userData,
              characters: userData.characters.map((character, index) => {
                if (index === selectedCharacterIndex) {
                  return {...character, isPurchased: true};
                }
                return character;
              }),
            };
            setUserData(newUserData);
          }

          // setShowConfetti(true); // 폭죽
          // setTimeout(() => setShowConfetti(false), 4000); // 폭죽 타이머
          CustomToast({type: 'success', text1: '구매 성공!'});
          setPurchaseModalVisible(false); // 모달 닫기
        } else {
          CustomToast({
            type: 'error',
            text1: '통신에 실패했습니다. 다시 시도해주세요.',
          });
        }
      } catch (error) {
        CustomToast({
          type: 'error',
          text1: '구매에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } else {
      CustomToast({type: 'error', text1: '포인트가 부족합니다.'});
    }
  }

  function handlePurchaseCancel() {
    // console.log('구매 취소!');
    setPurchaseModalVisible(false);
  }

  function handleEquipped() {
    CustomToast({type: 'error', text1: '이미 선택된 캐릭터입니다.'});
  }

  return (
    <S.Container>
      <S.Header>
        <S.DotBox>
          {characterData.map((_, index) => (
            <S.Dot key={index} isActive={selectedCharacterIndex === index} />
          ))}
        </S.DotBox>
      </S.Header>

      <S.Body>
        <S.CharacterBox>
          <Character />
        </S.CharacterBox>
      </S.Body>

      <S.Footer>
        {selectedCharacterIsPurchased ? (
          equippedCharacterIndex === selectedCharacterIndex ? (
            <>
              <S.ButtonBox onPress={handleEquipped}>
                <LinearGradient
                  colors={[
                    colors.all.firstPoint.linear.start,
                    colors.all.firstPoint.linear.end,
                  ]}
                  style={{
                    borderRadius: 30,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    overflow: 'hidden',
                  }}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}>
                  <RadialGradient
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 30,
                      opacity: 0.2,
                    }}
                    colors={['#ffffff', '#3D2FBF']}
                    stops={[0.04, 0.2]}
                    radius={500}
                    center={[100, 100]}></RadialGradient>
                </LinearGradient>
                <S.EquippedText>대표 캐릭터</S.EquippedText>
              </S.ButtonBox>

              <S.LevelBox>
                <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
                <S.ExperienceBox>
                  <S.Experience
                    percentage={selectedCharacterExp}></S.Experience>
                </S.ExperienceBox>
              </S.LevelBox>
            </>
          ) : (
            <>
              <S.ButtonBox onPress={toggleCharacterSelectModal}>
                {/* <LinearGradient
                  colors={[
                    colors.all.firstPoint.linear.start,
                    colors.all.firstPoint.linear.end,
                  ]}
                  style={{
                    borderRadius: 50,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    overflow: 'hidden',
                  }}
                  start={{x: 1, y: 0}}
                  end={{x: 0.5, y: 1}}>
                  <RadialGradient
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 50,
                      opacity: 0.2,
                    }}
                    colors={['#ffffff', '#3D2FBF']}
                    stops={[0.04, 0.2]}
                    radius={500}
                    center={[100, 100]}></RadialGradient> */}
                {/* </LinearGradient> */}
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#6EE2F5', '#6454F0']}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',

                    // position: 'absolute',
                  }}>
                  <S.ButtonText>선택</S.ButtonText>
                </LinearGradient>
              </S.ButtonBox>
              <S.LevelBox>
                <S.LevelText>Level {selectedCharacterLevel}</S.LevelText>
                <S.ExperienceBox>
                  <S.Experience
                    percentage={selectedCharacterExp}></S.Experience>
                </S.ExperienceBox>
              </S.LevelBox>
            </>
          )
        ) : (
          <S.LockButtonBox onPress={handlePurchaseCheck}>
            <S.ImgLeftBox>
              <S.LockedImage
                source={require('@/assets/icons/LockIcon.png')}
                resizeMode="contain"
              />
            </S.ImgLeftBox>
            <S.RightBox>
              <S.LockedText>4000 포인트</S.LockedText>
            </S.RightBox>
          </S.LockButtonBox>
        )}
      </S.Footer>

      <CharacterSelectModal
        characterSelectModalVisible={characterSelectModalVisible}
        toggleModal={toggleCharacterSelectModal}
        equippedCharacterChange={equippedCharacterChange}
      />
      <CharacterPurchaseCheckModal
        handleConfirm={handlePurchaseConfirm}
        handleCancel={handlePurchaseCancel}
        purchaseModalVisible={purchaseModalVisible}
      />
      {/* {showConfetti && <BoomEffect show={showConfetti} />} */}
    </S.Container>
  );
}

export default CharacterEdit;

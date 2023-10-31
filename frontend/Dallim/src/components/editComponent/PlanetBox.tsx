import React, { useState } from 'react';
import * as S from './PlanetBox.styles';
import { planetData } from '../common/PlanetData';
import WatchThemeModal from './editModal/WatchThemeModal';

interface Props {
  selectedPlanetIndex: number;
  selectedPlanetIsPurchased: boolean;
}

function PlanetBox({ selectedPlanetIndex, selectedPlanetIsPurchased }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const planetImage = planetData[selectedPlanetIndex].Planet;

  return (
    <S.Container>
      <S.PlanetBox>
        {selectedPlanetIsPurchased ? (
          <S.PlanetImage source={planetImage} resizeMode="contain" />
        ) : (
          <S.BlurredCharacterImage source={planetImage} resizeMode="contain" />
        )}
        <S.ThemeButton onPress={() => {
          console.log("테마 선택 버튼 클릭확인");
          setModalVisible(true);
        }}>
          <S.ThemeIcon source={require('@/assets/icons/ThemeSelectIcon.png')} />
        </S.ThemeButton>
      </S.PlanetBox>

      <WatchThemeModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        index={selectedPlanetIndex}
      />
    </S.Container>
  );
}

export default PlanetBox;

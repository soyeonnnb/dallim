import * as S from './PlanetBox.styles';
import {planetData} from '@/recoil/data/PlanetData';
import {useState} from 'react';
import WatchThemeModal from './editModal/WatchThemeModal';

import {useRecoilValue} from 'recoil';
import {
  selectedPlanetIndexState,
  selectedPlanetIsPurchasedState,
} from '@/recoil/UserRecoil';

function PlanetBox() {
  const selectedPlanetIndex = useRecoilValue(selectedPlanetIndexState);
  const selectedPlanetIsPurchased = useRecoilValue(
    selectedPlanetIsPurchasedState,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const planetImage = planetData[selectedPlanetIndex].Main;

  return (
    <S.Container>
      <S.PlanetBox>
        {selectedPlanetIsPurchased ? (
          <S.PlanetImage source={planetImage} resizeMode="contain" />
        ) : (
          <S.BlurredCharacterImage source={planetImage} resizeMode="contain" />
        )}
        <S.ThemeButton
          onPress={() => {
            // console.log("테마 선택 버튼 클릭확인");
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

import React, { useState } from 'react';
import * as S from './PlanetBox.styles';
import { planetData } from '../common/PlanetData';
import WatchThemeModal from './editModal/WatchThemeModal';

interface Props {
  index: number;
}

function PlanetBox({ index }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <S.Container>
      <S.PlanetBox>
        <S.PlanetImage source={planetData[index].Planet} resizeMode="contain" />
        <S.ThemeButton onPress={() => {
          console.log("테마 선택 버튼 클릭확인");
          setModalVisible(true);
        }}>
          <S.ThemeIcon source={require('../../assets/icons/ThemeSelectIcon.png')} />
        </S.ThemeButton>
      </S.PlanetBox>

      <WatchThemeModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        index={index}
      />
    </S.Container>
  );
}

export default PlanetBox;

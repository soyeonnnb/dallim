import React, { useState } from 'react';
import * as S from './RoomBox.styles';
import { roomData } from './RoomData';
import WatchThemeModal from './editModal/WatchThemeModal';

interface Props {
  index: number;
}

function RoomBox({ index }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <S.Container>
      <S.RoomBox>
        <S.RoomImage source={roomData[index].Room} resizeMode="contain" />
        <S.ThemeButton onPress={() => {
          console.log("테마 선택 버튼 클릭확인");
          setModalVisible(true);
        }}>
          <S.ThemeIcon source={require('../../assets/icons/ThemeSelectIcon.png')} />
        </S.ThemeButton>
      </S.RoomBox>

      <WatchThemeModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        index={index}
      />
    </S.Container>
  );
}

export default RoomBox;

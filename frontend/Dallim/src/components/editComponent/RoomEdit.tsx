import React, { useEffect, useState } from 'react';
import * as S from './RoomEdit.styles';
import RoomBox from './RoomBox';
import { roomData } from './RoomData';

type RoomEditProps = {
  onRoomChange: (index: number) => void;
  roomIndex: number;
  isOn: boolean;
}

function RoomEdit({ onRoomChange, roomIndex, isOn }: RoomEditProps) {

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(roomIndex);

  useEffect(() => {
    console.log("대표 방이 바꼈어요(Index) : " + selectedRoomIndex);
  }, [selectedRoomIndex]);

  function handleRoomChange(index: number) {
    console.log(index + "번째 방이 눌렸습니다!(Index)")
    setSelectedRoomIndex(index);
    onRoomChange(index); // 상위 컴포넌트로 전달
    // 여기에 캐릭터 Axios put 예정 
  }

  useEffect(() => {
    setSelectedRoomIndex(roomIndex);
  }, [roomIndex]);


  function confirmCharacterChange() {
    handleRoomChange(selectedRoomIndex % 4);
  }

  return (
    <S.Container>
      <S.Top>
        <S.TopBox>
          {roomData.map((_, index) => (
            <S.Dot key={index} isActive={selectedRoomIndex === index} />
          ))}
        </S.TopBox>
      </S.Top>
      <S.Body>
        <S.RoomBox isOn={isOn}>
          <RoomBox index={roomIndex} />
        </S.RoomBox> 
      </S.Body>
      <S.Bottom>
        <S.ButtonBox onPress={() => confirmCharacterChange()}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>
      </S.Bottom>

    </S.Container>
  );
};

export default RoomEdit;
import React, { useEffect, useState } from 'react';
import * as S from './RoomEdit.styles';
import Room from './RoomBox';
import { roomData } from './RoomData';
import RoomSelectModal from './editModal/RoomSelectModal';

type RoomEditProps = {
  onRoomChange: (index: number) => void;
  roomIndex: number;
  isOn: boolean;
}

function RoomEdit({ onRoomChange, roomIndex, isOn }: RoomEditProps) {

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(roomIndex);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("대표 방이 바꼈어요(Index 기준) : " + selectedRoomIndex);
  }, [selectedRoomIndex]);

  function handleRoomChange(index: number) {
    console.log(index + "번째 방이 눌렸습니다!(Index)")
    setSelectedRoomIndex(index);
    onRoomChange(index); // 상위 컴포넌트로 전달
  }

  useEffect(() => {
    setSelectedRoomIndex(roomIndex);
  }, [roomIndex]);

  function confirmRoomChange() {
    toggleModal();
    handleRoomChange(selectedRoomIndex % 5);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <S.Container>

      <S.Header>
        <S.DotBox>
          {roomData.map((_, index) => (
            <S.Dot key={index} isActive={selectedRoomIndex === index} />
          ))}
        </S.DotBox>
      </S.Header>

      <S.Body>
        <S.RoomBox isOn={isOn}>
          <Room index={roomIndex} />
        </S.RoomBox>
      </S.Body>

      <S.Footer>
        <S.ButtonBox onPress={toggleModal}>
          <S.ButtonText>선택</S.ButtonText>
        </S.ButtonBox>
      </S.Footer>

      <RoomSelectModal
        showModal={showModal}
        toggleModal={toggleModal}
        confirmRoomChange={confirmRoomChange}
        roomIndex={roomIndex}
      />

    </S.Container>
  );
};

export default RoomEdit;
import React from 'react';
import * as S from './RoomBox.styles';
import { roomData } from './RoomData';

interface Props {
    index: number;
}

function RoomBox({ index }: Props) {
    return (
        <S.Container>
            <S.RoomBox>
                <S.RoomImage source={roomData[index].Room} resizeMode="contain" />
            </S.RoomBox>
        </S.Container>
    );
}

export default RoomBox;

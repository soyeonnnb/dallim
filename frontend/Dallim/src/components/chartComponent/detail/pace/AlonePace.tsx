import * as S from './AlonePace.styles';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const NUM_SECTIONS = 3;
const DATA_HEIGHT = 40; // 각 데이터의 높이

function AlonePace() {
  const [sectionNum, setSectionNum] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  const data = [
    {
      // 0 ~ 1
      startTime: 0,
      finishTime: 1,
      pace: 214,
    },
    {
      // 1 ~ 2
      startTime: 1,
      finishTime: 2,
      pace: 213,
    },
    {
      // 2 ~ 3
      startTime: 2,
      finishTime: 3,
      pace: 1231,
    },
    {
      // 3 ~ 4
      startTime: 3,
      finishTime: 4,
      pace: 452,
    },
    {
      // 3 ~ 4
      startTime: 3,
      finishTime: 4,
      pace: 452,
    },
    {
      // 3 ~ 4
      startTime: 3,
      finishTime: 4,
      pace: 452,
    },
  ];
  useEffect(() => {
    setSectionNum(data.length + 1);
  }, []);

  const handlePress = (data: any) => {
    console.log('Pressed data:', data);
  };
  return (
    <S.Container
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onLayout={onLayout}>
      <S.ScrollInBox height={(parentHeight / 2.5) * sectionNum}>
        <S.SectionBox>
          <S.SectionBar>
            <S.SectionCircles>
              {[...new Array(sectionNum)].map((x, rowIndex) => (
                <S.SectionCircle parentWidth={parentWidth} key={rowIndex}>
                  <S.SectionCircleText>{rowIndex}</S.SectionCircleText>
                </S.SectionCircle>
              ))}
            </S.SectionCircles>
          </S.SectionBar>
        </S.SectionBox>
        <S.RecordBox>
          {data.map((record, rowIndex) => (
            <S.Records key={rowIndex} parentHeight={parentHeight}>
              <S.Record>
                <S.RecordName>달린 시간</S.RecordName>
                <S.RecordContent>00:10:21</S.RecordContent>
              </S.Record>
              <S.Record>
                <S.RecordName>페이스</S.RecordName>
                <S.RecordContent>00' 00''</S.RecordContent>
              </S.Record>
            </S.Records>
          ))}
        </S.RecordBox>
      </S.ScrollInBox>
    </S.Container>
  );
}
export default AlonePace;

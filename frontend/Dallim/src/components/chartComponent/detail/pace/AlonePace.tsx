import * as S from './AlonePace.styles';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {secondToMinuteSeconds, calculatePace} from '@/recoil/data/RunningData';
import {PaceSectionType} from '@/apis/ChartApi';
interface Props {
  data: PaceSectionType[];
  second: number;
  setSecond: any;
}

function AlonePace({data}: Props) {
  const [sectionNum, setSectionNum] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  useEffect(() => {
    setSectionNum(data.length + 1);
  }, []);

  return (
    <S.Container
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
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
                <S.RecordContent>
                  {secondToMinuteSeconds(record.finishTime - record.startTime)}
                </S.RecordContent>
              </S.Record>
              <S.Record>
                <S.RecordName>구간 페이스</S.RecordName>
                <S.RecordContent>{calculatePace(record.pace)}</S.RecordContent>
              </S.Record>
            </S.Records>
          ))}
        </S.RecordBox>
      </S.ScrollInBox>
    </S.Container>
  );
}
export default AlonePace;

import React from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import
import {Dimensions} from 'react-native';
import ChartCalendar from '../../components/chartComponent/main/Calendar';
import CalendarPreview from '../../components/chartComponent/main/Preview';

function Chart() {
  return (
    <>
      <S.BackgroundImage
        source={require('../../assets/images/MainBackground3.png')}
        resizeMode="cover"
      />
      <S.Container>
        <ChartCalendar />
        <CalendarPreview />
      </S.Container>
    </>
  );
}

export default Chart;

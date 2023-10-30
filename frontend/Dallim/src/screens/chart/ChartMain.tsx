import React, {useState, useRef, createRef} from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import
import ActionSheet, {
  SheetProvider,
  ActionSheetRef,
} from 'react-native-actions-sheet';

import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';

function Chart() {
  const ref = useRef<ActionSheetRef>(null);
  ref.current?.show();

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground3.png')}
        resizeMode="cover"
      />
      <S.Container>
        <Calendar />
        <SheetProvider>
          <Preview />
        </SheetProvider>
      </S.Container>
    </>
  );
}

export default Chart;

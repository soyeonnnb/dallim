/* eslint-disable curly */
import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import PreviewDaily from './preview/Daily';
import PreviewWeekly from './preview/Weekly';
import PreviewMonthly from './preview/Monthly';
import * as S from './Preview.styles';
import {CalendarType} from '@/components/common/CalendarData';

interface Props {
  isClicked?: boolean;
  selectedDate?: CalendarType;
}

function Preview({isClicked, selectedDate}: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isUp, setIsUp] = useState(false);

  const snapPoints = useMemo(() => ['40%', '90%'], []); // 전체 화면에서 몇퍼센트 차지할
  // useEffect(() => {}, [isClicked, selectedDate]);
  // sheet size 수정 시 실행
  const handleSheetChanges = useCallback((index: number) => {
    if (index == 0) setIsUp(false); // 0이 40%
    else setIsUp(true);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // default 사이즈 수정시
      snapPoints={snapPoints} // sheet를 어느정도로 둘 것인지
      onChange={handleSheetChanges} // sheet 사이즈 수정시
    >
      <S.Container>
        <S.DownPreview isShow={isUp ? false : true}>
          <PreviewWeekly isShow={isClicked ? false : true} />
          <PreviewDaily date={selectedDate} isShow={isClicked ? true : false} />
        </S.DownPreview>
        <PreviewMonthly isShow={isUp ? true : false} />
      </S.Container>
    </BottomSheet>
  );
}

export default Preview;

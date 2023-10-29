import React from 'react';
import {useState} from 'react';

import * as S from './Preview.styles';
import Weekly from './PreviewWeekly';
import Monthly from './PreviewMonthly';

function CalendarPreview() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    console.log('scrolled');
  };
  return (
    <S.Container>
      {!isScrolled && <Weekly />}
      {isScrolled && <Monthly />}
    </S.Container>
  );
}

export default CalendarPreview;

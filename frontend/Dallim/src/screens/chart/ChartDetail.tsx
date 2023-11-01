import React, {useState, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import * as S from './ChartDetail.styles';
import {ScrollView} from 'react-native';

import Overview from '@/components/chartComponent/detail/overview/Overview';
import Pace from '@/components/chartComponent/detail/pace/Pace';
import HeartRate from '@/components/chartComponent/detail/heartRate/HeartRate';

import ArrowLeft from '@/assets/icons/ArrowLeft';

// 타입을 정의합니다.
type Props = RouteProp<{ChartDetail: {id: number}}, 'ChartDetail'>;

function ChartDetail({route}: Props) {
  const {id} = route.params;

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground3.png')}
        resizeMode="cover"
      />
      <S.Container>
        <S.Header>
          <ArrowLeft width={30} height={30} color="white" />
          <S.HeaderTitle>11월 16일(목)</S.HeaderTitle>
          {/* 정렬을 맞추기 위함 */}
          <ArrowLeft width={30} height={30} color="transparent" />
        </S.Header>
        <ScrollView horizontal pagingEnabled>
          <Overview />
          <Pace />
          <HeartRate />
        </ScrollView>
      </S.Container>
    </>
  );
}

export default ChartDetail;

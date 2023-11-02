import React, {useState, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './ChartDetail.styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import {fetchDetailRunningData} from '@/apis/ChartApi';
import Loading from '@/components/common/Loading';

// 컴포넌트
import Overview from '@/components/chartComponent/detail/overview/Overview';
import Pace from '@/components/chartComponent/detail/pace/Pace';
import HeartRate from '@/components/chartComponent/detail/heartRate/HeartRate';

import ArrowLeft from '@/assets/icons/ArrowLeft';

import {RecordDetail} from '@/apis/ChartApi';
import {getDateObject} from '@/recoil/CalendarData';

// 스택 내비게이션 타입을 정의
type RootStackParamList = {
  ChartDetail: {
    id: string;
  };
};

type ChartDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChartDetail'
>;

// 타입을 정의합니다.
type Props = {
  route: RouteProp<{ChartDetail: {id: string}}, 'ChartDetail'>;
  navigation: ChartDetailScreenNavigationProp;
};

function ChartDetail({route, navigation}: Props) {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<RecordDetail | null>();
  const [createdAt, setCreatedAt] = useState<{
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
    second?: number;
    day?: string;
  }>();

  const fetchRunningData = async () => {
    try {
      const getData = await fetchDetailRunningData(id);
      setData(getData);
      setIsLoading(false);
      if (data) setCreatedAt(getDateObject(data.createdAt));
    } catch (error) {
      console.error('데이터 불러오기 에러 :', error);
    }
  };

  useEffect(() => {
    if (data) setCreatedAt(getDateObject(data.createdAt));
  }, [data]);

  useEffect(() => {
    fetchRunningData();
  }, []);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover"
      />
      {isLoading || !data ? (
        <Loading />
      ) : (
        <S.Container>
          <S.Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft width={30} height={30} color="white" />
            </TouchableOpacity>
            <S.HeaderTitle>
              {createdAt?.month}월 {createdAt?.date}일 ({createdAt?.day})
            </S.HeaderTitle>
            {/* 정렬을 맞추기 위함 */}
            <ArrowLeft width={30} height={30} color="transparent" />
          </S.Header>
          <ScrollView horizontal pagingEnabled>
            <Overview data={data} />
            <Pace />
            <HeartRate />
          </ScrollView>
        </S.Container>
      )}
    </>
  );
}

export default ChartDetail;

import * as S from './OverviewGraph.styles';
import {useState, useEffect} from 'react';
import {LineChart} from 'react-native-gifted-charts';
import {itemType} from 'react-native-gifted-charts/src/LineChart/types';

interface Props {
  title: string;
  data: itemType[];
}

function OverviewGraph({title, data}: Props) {
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showData, setShowData] = useState<itemType[]>([
    {value: 250},
    {value: 500},
    {value: 750},
    {value: 1000},
    {value: 1250},
  ]);
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setShowData(data);
    }
  }, []);
  useEffect(() => {
    if (data && !showData) {
      setIsLoading(false);
      setShowData(data);
    }
  }, [data]);
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      {/* {isLoading ? (
        <S.Text>로딩중입니다.</S.Text>
      ) : ( */}
      <S.Chart onLayout={onLayout}>
        <LineChart
          width={parentWidth}
          height={parentHeight}
          areaChart
          curved
          data={showData} // 데이터
          startFillColor="#D96767"
          backgroundColor="#D96767"
          startOpacity={1}
          endFillColor="#FF8080"
          endOpacity={0}
          color="#FF1B1B"
          hideDataPoints // 점 숨기기
          hideYAxisText // y 라벨 없애기
          hideAxesAndRules // 내부 선 및 y선 x선 없애기
          initialSpacing={0}
          adjustToWidth // width에 데이터 크기 맞추기
        />
      </S.Chart>
      {/* )} */}
    </S.Container>
  );
}

export default OverviewGraph;

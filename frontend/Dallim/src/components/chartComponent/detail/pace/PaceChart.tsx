import {useState, useEffect} from 'react';
import * as S from './PaceChart.styles';
import {secondToMinuteSeconds} from '@/recoil/data/RunningData';
import {LineChart} from 'react-native-gifted-charts';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import {PaceDataType} from '@/apis/ChartApi';
import {meterToKMOrMeter} from '@/recoil/data/RunningData';
import {colors} from '@/components/common/globalStyles';

import DataPreview from '../DataPreview';

interface Props {
  comparePair: boolean;
  data: PaceDataType;
  rivalData?: PaceDataType;
  second: number;
  setSecond: any;
  showRivals: boolean;
}

function PaceChart({
  comparePair,
  data,
  rivalData,
  showRivals,
  second,
  setSecond,
}: Props) {
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<string>();
  const [previewPace, setPreviewPace] = useState<string>();
  const [previewTime2, setPreviewTime2] = useState<string>();
  const [previewPace2, setPreviewPace2] = useState<string>();
  const [maxValue, setMaxValue] = useState<number>();
  const [distance, setDistance] = useState<string>('0m');
  const [totalDistance, setTotalDistance] = useState<string>('0m');

  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  const handlePreviewWidth = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setPreviewWidth(width);
  };

  const handlePreviewData = (pointerIndex: number) => {
    if (pointerIndex === -1) return;
    setPreviewTime(secondToMinuteSeconds(data.chartData[pointerIndex].second));
    setPreviewPace(data.chartData[pointerIndex].fromZeroPace);
    
    if (showRivals && rivalData) {
      setPreviewTime2(
        secondToMinuteSeconds(rivalData.chartData[pointerIndex].second),
      );
      setPreviewPace2(rivalData.chartData[pointerIndex].fromZeroPace);
    } else {
      setPreviewTime2(''); 
      setPreviewPace2('');
    }
  };

  useEffect(() => {
    handlePreviewData(data.chartData.length - 1);
    let max = 0;
    data.chartData.map(d => {
      max = max > d.value ? max : d.value;
    });
    if (rivalData) {
      rivalData.chartData.map(d => {
        max = max > d.value ? max : d.value;
      });
    }
    setMaxValue(max * 1.1);
    setDistance(
      meterToKMOrMeter(data.chartData[data.chartData.length - 1].distance),
    );
    setTotalDistance(
      meterToKMOrMeter(data.chartData[data.chartData.length - 1].distance),
    );
  }, []);

  return (
    <S.Container>
      <S.DataPreviewView onLayout={handlePreviewWidth}>
        <DataPreview
          width={previewWidth}
          color={colors.blue._500}
          upper={previewTime}
          lower={previewPace}
        />
        {comparePair && (
          <DataPreview
            width={previewWidth}
            color={colors.pink._500}
            upper={previewTime2}
            lower={previewPace2}
          />
        )}
      </S.DataPreviewView>
      <S.ChartView>
        <PanGestureHandler>
          <S.ChartBox onLayout={onLayout}>
            {data.chartData && (
              <LineChart
                width={parentWidth * 0.9}
                height={parentHeight * 0.9}
                areaChart
                curved
                // 혼자 달리기 그래프
                data={data.chartData}
                startFillColor={colors.blue._500}
                startOpacity={0.7}
                endFillColor={colors.blue._500}
                endOpacity={0}
                color1={colors.blue._500}
                // 같이달리기 그래프
                data2={comparePair ? rivalData?.chartData : undefined} // 같이달리기 컴포넌트
                startFillColor2={colors.pink._500}
                startOpacity2={0.7}
                endFillColor2={colors.pink._500}
                endOpacity2={0}
                color2={colors.pink._500}
                yAxisTextStyle={{color: 'white'}}
                yAxisLabelSuffix="m/s"
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisThickness={0}
                hideDataPoints // 점 숨기기
                // hideYAxisText // y 라벨 없애기
                initialSpacing={0}
                adjustToWidth // width에 데이터 크기 맞추기
                maxValue={maxValue}
                xAxisTextNumberOfLines={4}
                xAxisIndicesColor="white"
                pointerConfig={{
                  pointerStripHeight: parentHeight,
                  pointerStripColor: 'white',
                  pointerStripWidth: 2,
                  pointerColor: colors.blue._500,
                  pointer2Color: colors.pink._500,
                  radius: 6,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: true,
                }}
                getPointerProps={({pointerIndex}: {pointerIndex: number}) => {
                  if (pointerIndex === -1) return;
                  return (
                    <Label
                      data={data}
                      rivalData={rivalData}
                      comparePair={comparePair}
                      pointerIndex={pointerIndex}
                      setPreviewTime={setPreviewTime}
                      setPreviewPace={setPreviewPace}
                      setPreviewTime2={setPreviewTime2}
                      setPreviewPace2={setPreviewPace2}
                      setDistance={setDistance}
                    />
                  );
                }}
              />
            )}
          </S.ChartBox>
        </PanGestureHandler>
      </S.ChartView>
      <S.ChartDistanceView>
        <S.ChartDistanceTitle>현재거리</S.ChartDistanceTitle>
        <S.ChartDistanceTexts>
          <S.ChartDistance>{distance}</S.ChartDistance>
          <S.ChartTotalDistance>/ {totalDistance}</S.ChartTotalDistance>
        </S.ChartDistanceTexts>
      </S.ChartDistanceView>
    </S.Container>
  );
}
export default PaceChart;

function Label({
  data,
  rivalData,
  comparePair,
  pointerIndex,
  setPreviewTime,
  setPreviewPace,
  setPreviewTime2,
  setPreviewPace2,
  setDistance,
}: {
  data: any;
  rivalData: any;
  comparePair: any;
  pointerIndex: any;
  setPreviewTime: any;
  setPreviewPace: any;
  setPreviewTime2: any;
  setPreviewPace2: any;
  setDistance: any;
}) {
  useEffect(() => {
    const items = data.chartData[pointerIndex];
    setPreviewTime(secondToMinuteSeconds(items.second));
    setPreviewPace(items.fromZeroPace);
    setDistance(meterToKMOrMeter(items.distance));
    // 'comparePair' 상태가 true이고 rivalData가 있는 경우, 두 번째 데이터도 설정합니다.
    if (comparePair && rivalData) {
      const rivalItems = rivalData.chartData[pointerIndex];
      setPreviewTime2(secondToMinuteSeconds(rivalItems.second));
      setPreviewPace2(rivalItems.fromZeroPace);
    }
  }, [pointerIndex]);
  return <></>;
}

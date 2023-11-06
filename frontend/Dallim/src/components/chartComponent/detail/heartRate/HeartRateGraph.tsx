import * as S from './HeartRateGraph.styles';
import {useState, useEffect} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {LineChart} from 'react-native-gifted-charts';
import {secondToHourMinuteSeconds} from '@/recoil/RunningData';
interface Props {
  data: {
    value: number;
    second: number;
  }[];
}

function HeartRateGraph({data}: Props) {
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<number>(0);
  const [previewHeartRate, setPreviewHeartRate] = useState<number>(0);
  const [previewHeartRateColor, setPreviewHeartRateColor] =
    useState<string>('white');

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

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // 이곳에서 ChartBox를 가로로 스크롤하도록 처리합니다.
      // event.nativeEvent.translationX를 사용하여 가로 스크롤 이동을 처리할 수 있습니다.
    }
  };
  const handlePreviewData = (item: {value: number; second: number}) => {
    setPreviewTime(item.second);
    setPreviewHeartRate(item.value);
    const chartColor: string[] = [
      '#FF1178',
      '#FFF205',
      '#7CFF01',
      '#01FFF4',
      '#9C00FF',
    ];
    if (item.value < 137) setPreviewHeartRateColor(chartColor[0]);
    else if (item.value < 150) setPreviewHeartRateColor(chartColor[1]);
    else if (item.value < 163) setPreviewHeartRateColor(chartColor[2]);
    else if (item.value < 176) setPreviewHeartRateColor(chartColor[3]);
    else setPreviewHeartRateColor(chartColor[4]);
  };
  useEffect(() => {
    handlePreviewData(data[data.length - 1]);
  }, []);

  return (
    <S.Container>
      <S.DataPreviewView>
        <S.DataPreview>
          <S.DataPreviewTime>
            {secondToHourMinuteSeconds(previewTime)}
          </S.DataPreviewTime>
          <S.DataPreviewHeartRate color={previewHeartRateColor}>
            {previewHeartRate}
          </S.DataPreviewHeartRate>
        </S.DataPreview>
      </S.DataPreviewView>
      <S.ChartView>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <S.ChartBox onLayout={onLayout}>
            {data && (
              <LineChart
                width={parentWidth * 0.9}
                height={parentHeight * 0.9}
                areaChart
                curved
                // 혼자 달리기 그래프
                // data={chartData} // 혼자 달리기 컴포넌트
                data={data}
                startFillColor="#D96767"
                startOpacity={1}
                endFillColor="#FF8080"
                endOpacity={0}
                color="#FF1B1B"
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisColor={'rgba(255, 255, 255, 0)'}
                hideDataPoints // 점 숨기기
                initialSpacing={0}
                yAxisTextStyle={{color: 'white'}}
                adjustToWidth // width에 데이터 크기 맞추기
                xAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
                pointerConfig={{
                  pointerStripHeight: parentHeight,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'lightgray',
                  radius: 3,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: false,
                  pointerLabelComponent: (items: any) => {
                    if (items[0]) {
                      handlePreviewData(items[0]);
                    }
                  },
                }}
              />
            )}
          </S.ChartBox>
        </PanGestureHandler>
      </S.ChartView>
    </S.Container>
  );
}

export default HeartRateGraph;

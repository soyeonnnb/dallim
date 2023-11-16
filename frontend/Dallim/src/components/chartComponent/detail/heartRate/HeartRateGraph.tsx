import * as S from './HeartRateGraph.styles';
import {useState, useEffect} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {LineChart} from 'react-native-gifted-charts';
import {secondToMinuteSeconds} from '@/recoil/data/RunningData';
import DataPreview from '../DataPreview';

interface Props {
  data: {
    value: number;
    second: number;
  }[];
  chartColor: string[];
}

function HeartRateGraph({data, chartColor}: Props) {
  const [previewTime, setPreviewTime] = useState<string>(0);
  const [previewHeartRate, setPreviewHeartRate] = useState<number>(0);
  const [heartRateColor, setHeartRateColor] = useState<string>(chartColor[0]);

  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  const handlePreviewData = (item: {value: number; second: number}) => {
    setPreviewTime(secondToMinuteSeconds(item.second));
    setPreviewHeartRate(item.value);

    if (item.value < 137) setHeartRateColor(chartColor[0]);
    else if (item.value < 150) setHeartRateColor(chartColor[1]);
    else if (item.value < 163) setHeartRateColor(chartColor[2]);
    else if (item.value < 176) setHeartRateColor(chartColor[3]);
    else setHeartRateColor(chartColor[4]);
  };

  const [previewWidth, setPreviewWidth] = useState<number>(0);

  useEffect(() => {
    handlePreviewData(data[data.length - 1]);
  }, []);
  const handlePreviewWidth = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setPreviewWidth(width);
  };

  return (
    <S.Container>
      <S.DataPreviewView onLayout={handlePreviewWidth}>
        <DataPreview
          width={previewWidth}
          color={heartRateColor}
          upper={previewTime}
          lower={`${previewHeartRate}`}
        />
      </S.DataPreviewView>
      <S.ChartView>
        <PanGestureHandler>
          <S.ChartBox onLayout={onLayout}>
            {data && (
              <LineChart
                width={parentWidth * 0.9}
                height={parentHeight * 0.9}
                areaChart
                curved
                data={data}
                startFillColor={heartRateColor}
                startOpacity={0.7}
                endFillColor={heartRateColor}
                endOpacity={0}
                color={heartRateColor}
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisThickness={0}
                hideDataPoints // 점 숨기기
                initialSpacing={0}
                yAxisTextStyle={{color: 'white'}}
                adjustToWidth // width에 데이터 크기 맞추기
                pointerConfig={{
                  pointerStripHeight: parentHeight,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: heartRateColor,
                  radius: 6,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: false,
                }}
                getPointerProps={({pointerIndex}: {pointerIndex: number}) => {
                  if (pointerIndex === -1) return;
                  return (
                    <Label
                      items={data[pointerIndex]}
                      handlePreviewData={handlePreviewData}
                    />
                  );
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
function Label({
  items,
  handlePreviewData,
}: {
  items: {
    value: number;
    second: number;
  };
  handlePreviewData: any;
}) {
  useEffect(() => {
    handlePreviewData(items);
  }, [items]);
  return <></>;
}

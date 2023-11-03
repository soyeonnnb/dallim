import * as S from './OverviewGraph.styles';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

interface Props {
  title: string;
}

function OverviewGraph({title}: Props) {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, 1)`, // optional
        strokeWidth: 1, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#08130D',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
  };
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      <S.Chart>
        <S.Text>
          <LineChart
            data={data}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={chartConfig}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            bezier // 이게 둥글게 해줌
            fromZero={true} // 데이터가 0부터 시작
            withDots={false} // 차트에 점을 보이지 않도록 함
            withInnerLines={false} // 차트 내에 선을 보이도록 함
            withOuterLines={false} // 차트 x, y축에 선을 보이지 않도록 함
          />
        </S.Text>
      </S.Chart>
    </S.Container>
  );
}

export default OverviewGraph;

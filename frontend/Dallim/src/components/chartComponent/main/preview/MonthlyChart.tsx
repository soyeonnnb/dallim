import * as S from './MonthlyChart.styles';

interface Props {
  selectedYearMonth: {
    year: number;
    month: number;
  };
  setSelectedYearMonth: any;
}
function MonthlyChart({selectedYearMonth, setSelectedYearMonth}: Props) {
  return (
    <S.Container>
      <S.Title>월별 현황</S.Title>
      <S.ChartSheet></S.ChartSheet>
    </S.Container>
  );
}
export default MonthlyChart;

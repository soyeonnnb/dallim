import * as S from './MonthlyChart.styles';

interface Props {
  year: number;
  month: number;
  setYear: any;
  setMonth: any;
}
function MonthlyChart({year, month, setYear, setMonth}: Props) {
  return (
    <S.Container>
      <S.Title>월별 현황</S.Title>
      <S.ChartSheet></S.ChartSheet>
    </S.Container>
  );
}
export default MonthlyChart;

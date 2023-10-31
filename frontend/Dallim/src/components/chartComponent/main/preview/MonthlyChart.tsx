import * as S from './MonthlyChart.styles';

interface Props {
  year: number;
  month: number;
  setYear: any;
  setMonth: any;
}
function MonthlyChart({year, month, setYear, setMonth}: Props) {
  return <S.Container></S.Container>;
}
export default MonthlyChart;

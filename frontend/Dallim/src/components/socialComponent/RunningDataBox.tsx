import * as S from './RunningDataBox.styles';
import PlaceIcon from '@/assets/icons/PlaceIcon.png';
import DateIcon from '@/assets/icons/DateIcon.png';
import DistIcon from '@/assets/icons/DistIcon.png';
import TimeIcon from '@/assets/icons/TimeIcon.png';
import SpeedIcon from '@/assets/icons/SpeedIcon.png';

interface RunningDataBoxProps {
  location: string;
  createdAt: string;
  totalDistance: number;
  totalTime: number;
  averageSpeed: number;
  registration: boolean;
}

function RunningDataBox({
  location,
  createdAt,
  totalDistance,
  totalTime,
  averageSpeed,
  registration
}: RunningDataBoxProps) {

  // 날짜 형식 변환 함수, 예: "2023-10-25T21:00:00" -> "2023년 10월 25일"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <S.Container>
      <S.Box>
        <S.Top>
          <S.TopLeft>
            <S.Icon>
              <S.IconImage source={PlaceIcon} />
            </S.Icon>
            <S.Text>
              {location}
            </S.Text>
          </S.TopLeft>
          <S.TopRight>
            <S.Icon>
              <S.IconImage source={DateIcon} />
            </S.Icon>
            <S.Text>
              {formatDate(createdAt)}
            </S.Text>
          </S.TopRight>
        </S.Top>
        <S.Middle>
          <S.MiddleLeft>
            <S.Icon>
              <S.IconImage source={DistIcon} />
            </S.Icon>
            <S.Text>
              {totalDistance.toFixed(2)} 키로미터
            </S.Text>
          </S.MiddleLeft>
          <S.MiddleRight>
            <S.Icon>
              <S.IconImage source={TimeIcon} />
            </S.Icon>
            <S.Text>
              {totalTime}분
            </S.Text>
          </S.MiddleRight>
        </S.Middle>
        <S.Bottom>
          <S.BottomLeft>
            <S.Icon>
              <S.IconImage source={SpeedIcon} />
            </S.Icon>
            <S.Text>
              {averageSpeed.toFixed(2)} Km/h
            </S.Text>
          </S.BottomLeft>
          <S.BottomRight>
            <S.AddBox>
              <S.AddButton onPress={() => {
                console.log("기록저장 버튼 클릭확인");
              }}>
                <S.AddText>등록</S.AddText>
              </S.AddButton>
            </S.AddBox>
          </S.BottomRight>
        </S.Bottom>
      </S.Box>
    </S.Container>
  );
};

export default RunningDataBox;

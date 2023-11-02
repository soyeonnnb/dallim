import * as S from './RunningDataBox.styles';
import PlaceIcon from '@/assets/icons/PlaceIcon.png';
import DateIcon from '@/assets/icons/DateIcon.png';
import DistIcon from '@/assets/icons/DistIcon.png';
import TimeIcon from '@/assets/icons/TimeIcon.png';
import SpeedIcon from '@/assets/icons/SpeedIcon.png';

function RunningDataBox() {

  const PlaceText = "서울, 석촌호수"; // 장소
  const DateText = "2023년 10월 15일"; // 
  const DistText = "5";
  const TimeText = "60";
  const SpeedText = "5";

  return (
    <S.Container>
      <S.Box>
        <S.Top>
          <S.TopLeft>
            <S.Icon>
              <S.IconImage source={PlaceIcon} />
            </S.Icon>
            <S.Text>
              {PlaceText}
            </S.Text>
          </S.TopLeft>
          <S.TopRight>
            <S.Icon>
              <S.IconImage source={DateIcon} />
            </S.Icon>
            <S.Text>
              {DateText}
            </S.Text>
          </S.TopRight>
        </S.Top>
        <S.Middle>
          <S.MiddleLeft>
            <S.Icon>
              <S.IconImage source={DistIcon} />
            </S.Icon>
            <S.Text>
              {DistText} 키로미터
            </S.Text>
          </S.MiddleLeft>
          <S.MiddleRight>
            <S.Icon>
              <S.IconImage source={TimeIcon} />
            </S.Icon>
            <S.Text>
              {TimeText}분
            </S.Text>
          </S.MiddleRight>
        </S.Middle>
        <S.Bottom>
          <S.BottomLeft>
            <S.Icon>
              <S.IconImage source={SpeedIcon} />
            </S.Icon>
            <S.Text>
              {SpeedText} Km/h
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

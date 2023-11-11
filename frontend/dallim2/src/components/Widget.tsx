import * as S from "./Widget.styles";
import QrCode from "./unit/QrCode";
import widget from "../assets/images/widget/widget-widget.png";
import alarm from "../assets/images/widget/widget-alarm.png";
import BottomBar from "./unit/BottomBar";

function Widget() {
  return (
    <S.Container>
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>
      <S.Body>

        <S.BodyTop>
          <S.TopTitleBox>
            <S.TopText>
              편의성과 익숙함에 속아
              <br />
              당신을 놓치지 않을 거에요!
            </S.TopText>
          </S.TopTitleBox>
        </S.BodyTop>

        <S.BodyMiddle>
          <S.MiddleTitleBox>
            <S.MiddleBox>
              <S.MiddleMainText>알림</S.MiddleMainText>
              <S.MiddleSubText>
                런닝 기록을 알려드려요
              </S.MiddleSubText>
              <S.MiddleAddText>
                주기적인 러닝 패턴을 위해
              </S.MiddleAddText>
              <S.MiddleAddText>
                저장한 요일 시간에 알람이 가요
              </S.MiddleAddText>

            </S.MiddleBox>
          </S.MiddleTitleBox>
        </S.BodyMiddle>

        <S.BodyBottom>
          <S.BottomTitleBox>
            <S.TitleBox>
              <S.BottomMainText>위젯</S.BottomMainText>
              <S.BottomSubText>
                런닝 기록을 알려드려요
              </S.BottomSubText>
              <S.BottomAddText>
                함께 뛰는 캐릭터를 배경화면에서 만날 수 있어요
                <br />
                런닝 기록을 편하게 확인하세요
              </S.BottomAddText>
            </S.TitleBox>
          </S.BottomTitleBox>

        </S.BodyBottom>

      </S.Body>

      <S.WidgetImage1 src={widget} />
      <S.WidgetImage2 src={alarm} />


      <S.Footer>
        <BottomBar />
      </S.Footer>

    </S.Container>
  );
}
export default Widget;

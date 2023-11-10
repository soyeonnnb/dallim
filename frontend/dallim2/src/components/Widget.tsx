import * as S from "./Widget.styles";
import QrCode from "./unit/QrCode";
import Widget_1 from "../assets/images/widget/Widget_1.png";
import Widget_2 from "../assets/images/widget/Widget_2.png";

function Widget() {
  return (
    <S.Container>
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>
      <S.Body>

        <S.BodyTop>
          <S.TitleBox>
            <S.SubText2>
              편의성과 익숙함에 속아
              <br />
              당신을 놓치지 않을 거에요!
            </S.SubText2>
          </S.TitleBox>
        </S.BodyTop>

        <S.BodyMiddle>
          <S.TitleBox>
            <S.MainText>위젯</S.MainText>
            <S.SubText>
              런닝 기록을 알려드려요
            </S.SubText>
            <S.AddText>
              주기적인 러닝 패턴을 위해
              <br />
              저장한 요일 시간에 알람이 가요.
            </S.AddText>
          </S.TitleBox>
        </S.BodyMiddle>

        <S.BodyBottom>
          <S.TitleBox>
            <S.MainText2>테마</S.MainText2>
            <S.SubText2>
              당신만의 화면을 꾸며보세요
            </S.SubText2>
            <S.AddText2>
              함께 뛰는 캐릭터를 배경화면에서 만날 수 있어요 !
              <br />
              런닝 기록을 편하게 확인하세요.
            </S.AddText2>
          </S.TitleBox>
        </S.BodyBottom>

      </S.Body>

      <S.WidgetImage2 src={Widget_1} />
      <S.WidgetImage1 src={Widget_2} />


      <S.Footer>
      </S.Footer>

    </S.Container>
  );
}
export default Widget;

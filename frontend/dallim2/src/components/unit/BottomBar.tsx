import * as S from "./BottomBar.styles";
import QR from "../../assets/images/widget/QR.png";

function BottomBar() {
  return (
    <S.Container>
      <S.Box>
        <S.LeftBox>
          <S.ImageBox>
            <S.Image src={QR} />
          </S.ImageBox>
        </S.LeftBox>
        <S.RightBox>
          <S.TextMain>
            <S.Text1>
              본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.            </S.Text1>
          </S.TextMain>
          <S.TextSub>
            <S.Text2>
              Copyright © YEODULT All Rights Reserved.
            </S.Text2>
          </S.TextSub>
        </S.RightBox>

      </S.Box>
    </S.Container>
  );
}
export default BottomBar;

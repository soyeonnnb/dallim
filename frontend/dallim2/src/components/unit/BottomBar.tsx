import * as S from "./BottomBar.styles";
import Logo from "../../assets/Icons/Logo.png";

function BottomBar() {
  return (
    <S.Container>
      <S.Box>
        <S.LeftBox>
          <S.ImageBox>
            <S.Image src={Logo} />
          </S.ImageBox>
        </S.LeftBox>

        <S.RightBox>
          <S.TextMain>
            <S.MainText>
              본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.            </S.MainText>
          </S.TextMain>
          <S.TextSub>
            <S.SubText>
              Copyright © YEODULT All Rights Reserved.
            </S.SubText>
          </S.TextSub>
        </S.RightBox>

      </S.Box>
    </S.Container>
  );
}
export default BottomBar;

import styled from "styled-components";
import { InnerDiv } from "./Common.styles";

export const Container = styled(InnerDiv)`
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  /* border: 1px solid blue; */
  color: white;
  width: 100vw;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`;

export const qrBox = styled.div`
  color: white;
  width: 20%;
  height: 100%;
  padding-right: 2%;
`;

export const Body = styled.div`
  flex-direction: row;
  width: 70vw;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

export const TitleBox = styled.div`
  flex-direction: row;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 400%;
  font-weight: bold;
  color: #554bab;
`;

export const SubText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 200%;
  font-weight: bold;
  color: black;
`;

export const HighlightedText = styled.div`
  color: #a59bf6; /* 특정 단어에 적용할 색상 */
`;

export const AddText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #8c8c8c;
  font-size: 150%;
  font-weight: bold;
`;

export const Footer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FooterLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PhoneBox = styled.div`
  /* border: 1px solid blue; */
  width: 70%;
  height: 100%;
`;

export const PhoneImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const FooterRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const WatchBox = styled.div`
  height: 40%;
`;

export const WatchImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 20%;
  object-fit: contain;
`;

export const BackBar = styled.div`
  width: 100vw;
  height: 20%;
  position: absolute;
  top: 55%;
  z-index: -1;
  object-fit: contain;
  background-color: #c2c3cf;
`;

export const TempBox = styled.div`
  border-radius: 5px;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media (max-width: 700px) {
    width: 25vw;
  }
`;

export const TempImage = styled.img`
  width: 100%;
  transform: rotate(30deg);
`;

export const TempText = styled.div`
  color: white;
  font-size: 200%;
  font-weight: 700;
`;

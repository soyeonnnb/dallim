import styled from "styled-components";
import { InnerDiv } from "./Common.styles";

export const Container = styled(InnerDiv)`
  position: relative;
  justify-content: center;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  top: 0%;
  z-index: -2;
`;

export const Header = styled.div`
  border: 1px solid red;
  color: white;
  width: 100vw;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`;

export const qrBox = styled.div`
  border: 1px solid green;
  color: white;
  width: 20%;
  height: 100%;
  margin-right: 2%;
`;

export const Body = styled.div`
  border: 1px solid blue;
  width: 80vw;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const EmptyBox = styled.div`
  border: 1px solid red;
  width: 50%;
  height: 20%;
`;

export const TitleMainBox = styled.div`
  border: 1px solid red;
  flex-direction: column;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

export const RealText = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 400px;
  height: 150px;
  font-size: 70px;
  color: #554bab;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  margin-top: 50px;
`;

export const TitleSubBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TextTempBox = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 30%;
`;

export const MainText = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 200%;
  color: white;
`;

export const SubText = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 120%;
  color: #d5d1fb;
`;

export const HighlightedText = styled.span`
  color: #a59bf6; /* 특정 단어에 적용할 색상 */
`;

export const Footer = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100vw;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const LeftBox = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const LeftBoxTitleBox = styled.div`
  border: 1px solid blue;
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const LeftTitle = styled.div`
  border: 1px solid blue;
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: white;
`;

export const RightBox = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 45%;
  height: 100%;
`;

export const VersusImage = styled.img`
  width: 65%;
  height: 65%;
  position: absolute;
  top: 35%;
  left: 40%;
  z-index: -1;
  object-fit: contain;
`;

export const ImageBox = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 80%;
  height: 50vh;
`;

export const PhoneImage = styled.img`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 25%;
  left: -10%;
  z-index: -1;
  object-fit: contain;
`;

export const TempBox = styled.div`
  border: 1px solid #000;
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

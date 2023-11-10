import styled from "styled-components";
import { InnerDiv } from "./Common.styles";

export const Container = styled(InnerDiv)`
  position: relative;
  justify-content: center;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 70%;
  position: absolute;
  top: 50%;
  z-index: -2;
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
  width: 80%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const EmptyBox = styled.div`
  width: 50%;
  height: 20%;
`;

export const TitleBox = styled.div`

  flex-direction: row;
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const MainText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 400%;
  font-weight: bold;
  color: #554bab;
`;

export const SubText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: bold;
  color: black;
`;

export const HighlightedText = styled.span`
  color: #a59bf6; /* 특정 단어에 적용할 색상 */
`;

export const AddText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 20%;
  font-size: 150%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c8c8c;
`;

export const Footer = styled.div`
  flex-direction: row;
  width: 100vw;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ImageBox = styled.div`
  flex-direction: row;
  width: 80%;
  height: 50vh;
`;

export const SelectImage = styled.img`
  width: 90%;
  max-width: 1100px;
  height: 80%;
  top: 15%;
  z-index: -1;
  position: absolute;
  object-fit: contain;
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

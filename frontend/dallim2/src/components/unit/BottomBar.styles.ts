import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
  width: 100vw;
  height: 100%;
`;

export const Box = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #0a0927;
`;

export const LeftBox = styled.div`
  justify-content: center;
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text1 = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  color: #545b63;
`;

export const Text2 = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export const ImageBox = styled.div`
  justify-content: center;
  width: 100px;
  height: 100px;
  padding-left: 50%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const RightBox = styled.div`
  justify-content: center;
  width: 70%;
  height: 100%;
`;

export const TextMain = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const TextSub = styled.div`
  justify-content: center;
  width: 100%;
  height: 60%;
`;

export const QrLeft = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GooglePlayImage = styled.img`
  width: 90%;
  height: 60%;
  object-fit: contain;
`;

export const QrRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QrImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

`;

export const QrLeft = styled.div`
  border: 1px solid blue;
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
  border: 1px solid red;
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

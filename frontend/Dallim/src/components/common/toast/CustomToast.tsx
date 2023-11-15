// SuccessToast.tsx
import React from 'react';
import * as S from './CustomToast.styles';
import Toast from 'react-native-toast-message';

interface CustomToastProps {
  type: 'success' | 'error';
  text1: string;
}
export const CustomToast = ({ type, text1 }: CustomToastProps) => {
  Toast.show({
    type: type,
    position: 'top',
    text1: text1,
    visibilityTime: 300000,
    autoHide: true,
    topOffset: 70,
  });
};

interface ToastProps {
  text1: string;
}
export const SuccessToast: React.FC<ToastProps> = ({ text1 }) => (
  <S.ToastContainer>
    <S.SuccesssBorderBox>
      <S.LeftBox>
        <S.ToastIcon source={require('@/assets/icons/SuccessToastIcon.png')} resizeMode='contain' />
      </S.LeftBox>
      <S.RightBox>
        <S.ToastTextBox>
          <S.ToastText>{text1}</S.ToastText>
        </S.ToastTextBox>
      </S.RightBox>
    </S.SuccesssBorderBox>
  </S.ToastContainer>
);

export const ErrorToast: React.FC<ToastProps> = ({ text1 }) => (
  <S.ToastContainer>
    <S.ErrorBorderBox>
      <S.LeftBox>
        <S.ToastIcon source={require('@/assets/icons/ErrorToastIcon.png')} resizeMode='contain' />
      </S.LeftBox>
      <S.RightBox>
        <S.ToastTextBox>
          <S.ToastText>{text1}</S.ToastText>
        </S.ToastTextBox>
      </S.RightBox>
    </S.ErrorBorderBox>
  </S.ToastContainer>
);

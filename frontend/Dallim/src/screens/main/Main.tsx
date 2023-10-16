import React from 'react';
import * as S from './Main.styles';

interface MainProps {
    navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const Main: React.FC<MainProps> = ({ navigation }) => {
    return (
        <S.Container>
            <S.Title>Main Screen</S.Title>
            <S.CustomButton onPress={() => navigation.navigate('Login')}>
                <S.ButtonText>Go to Login</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('Chart')}>
                <S.ButtonText>Go to Chart</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('Social')}>
                <S.ButtonText>Go to Social</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('Edit')}>
                <S.ButtonText>Go to Edit</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('Profile')}>
                <S.ButtonText>Go to Profile</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('NotFound')}>
                <S.ButtonText>Go to NotFound</S.ButtonText>
            </S.CustomButton>
        </S.Container>
    );
};

export default Main;

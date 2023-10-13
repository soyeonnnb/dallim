import React from 'react';
import { Button } from 'react-native';
import * as S from './Home.style';

interface HomeProps {
    navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <S.Container>
            <S.Title>Home Screen</S.Title>
            <S.CustomButton onPress={() => navigation.navigate('Login')}>
                <S.ButtonText>Go to Login</S.ButtonText>
            </S.CustomButton>
            <S.CustomButton onPress={() => navigation.navigate('Profile')}>
                <S.ButtonText>Go to Profile</S.ButtonText>
            </S.CustomButton>
        </S.Container>
    );
};

export default Home;

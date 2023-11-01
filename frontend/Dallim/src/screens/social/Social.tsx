import * as S from './Social.styles'; // 스타일 컴포넌트 import
import { useNavigation } from '@react-navigation/native';
import SocialHeader from '../../components/socialComponent/SocialHeader';
import SocialBody from '../../components/socialComponent/SocialBody';

function Social() {

    const navigation = useNavigation();
    return (
        <S.Container>
            <S.BackgroundImage
                source={require('@/assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Header>
                    <SocialHeader />
                </S.Header>
                <S.Body>
                    <SocialBody navigation={navigation} />
                </S.Body>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Social;

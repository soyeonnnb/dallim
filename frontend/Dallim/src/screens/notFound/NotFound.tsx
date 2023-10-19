import * as S from './NotFound.style';
import { Button } from 'react-native';

interface ProfileProps {
    navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const NotFound = ({ navigation }: ProfileProps) => {
    return (
        <S.Container>
            <S.Description>
                ⚠️
            </S.Description>
            <S.Description>
                잘못된 접근 경로입니다.
            </S.Description>
            <Button
                title="Go back to Main"
                onPress={() => navigation.navigate('Main')}
            />
        </S.Container>
    );
}

export default NotFound;

import * as S from './GameStartStack.styles';

interface GameStartStackProps {
  navigation: any;
}

function GameStartStack({ navigation }: GameStartStackProps) {

  return (
    <S.Container>
      <S.BackgroundImage source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
        </S.Header>

        <S.Body>
        </S.Body>

        <S.Footer>
        </S.Footer>

        <S.TabBox />

      </S.BackgroundImage>

    </S.Container >
  );
};

export default GameStartStack;

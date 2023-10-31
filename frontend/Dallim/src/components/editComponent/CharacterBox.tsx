import * as S from './CharacterBox.styles';
import { characterData } from '../common/CharacterData';

interface Props {
    selectedCharacterIndex: number;
    selectedEvolutionStage: number;
    selectedCharacterIsPurchased: boolean;
}

function CharacterBox({ selectedCharacterIndex, selectedEvolutionStage, selectedCharacterIsPurchased }: Props) {
    const characterImage = characterData[selectedCharacterIndex].levels[selectedEvolutionStage].front;

    return (
        <S.Container>
            <S.CharacterBox>
                {selectedCharacterIsPurchased ? (
                    <S.CharacterImage source={characterImage} resizeMode="contain" />
                ) : (
                    <S.BlurredCharacterImage source={characterImage} resizeMode="contain" />
                )}
            </S.CharacterBox>
        </S.Container>
    );
}
export default CharacterBox;

import { characterData } from '@/recoil/CharacterData';
import * as S from './RankInfoBox.styles';

type RankInfoBoxProps = {
    userId: number;
    rank: number;
    characterIndex: number;
    evolutionStage: number;
    nickname: string;
    cumulativeDistance: number;
    level: number;
    follower: boolean;
    navigation: any;
};

function RankInfoBox({ userId, rank, characterIndex, evolutionStage, nickname, cumulativeDistance, level, follower, navigation }: RankInfoBoxProps) {

    const displayDistance = Math.floor(cumulativeDistance);
    const selectedCharacter = characterData[characterIndex].evolutions[evolutionStage].front;
   
    return (
        <S.Container>
            <S.Box rank={rank}>
                <S.Left>
                    <S.RankText rank={rank}>{rank}</S.RankText>
                </S.Left>
                <S.Middle onPress={() => navigation.navigate('UserDetailStack', { userId: userId })}>
                    <S.Header>
                        <S.DistanceText>{displayDistance}m</S.DistanceText>
                    </S.Header>
                    <S.Body>
                        <S.NickNameText>{nickname}</S.NickNameText>
                        <S.LevelText>Lv. {level}</S.LevelText>
                    </S.Body>
                </S.Middle>
                <S.right>
                    <S.ImageBox>
                        <S.CharacterImage source={selectedCharacter} resizeMode='contain' />
                    </S.ImageBox>
                </S.right>
            </S.Box>
        </S.Container>
    );
};

export default RankInfoBox;

import * as S from './RankInfoBox.styles';

type Props = {
    rank: number;
    distance: number;
    nickname: string;
    cumulativeDistance: number;
    level: number;
    follower: boolean;
    navigation: any;
};

function RankInfoBox({ rank, nickname, cumulativeDistance, level, follower, navigation }: Props) {

    const displayDistance = Math.floor(cumulativeDistance);

    return (
        <S.Container>
            <S.Box rank={rank}>
                <S.Left>
                    <S.RankText rank={rank}>{rank}</S.RankText>
                </S.Left>
                <S.Middle onPress={() => navigation.navigate('UserDetailStack')}>
                    <S.Header>
                        <S.DistanceText>{displayDistance}m</S.DistanceText>
                    </S.Header>
                    <S.Body>
                        <S.NickNameText>{nickname}</S.NickNameText>
                        <S.LevelText>Lv. {level}</S.LevelText>
                    </S.Body>
                </S.Middle>
            </S.Box>
        </S.Container>
    );
};

export default RankInfoBox;

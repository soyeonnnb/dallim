import * as S from './RankInfoBox.styles';

type Props = {
    Rank: number;
    Distance: number;
    Nickname: string;
    Level: number;
    navigation: any;
};

function RankInfoBox({ Rank, Distance, Nickname, Level, navigation }: Props) {

    return (
        <S.Container>
            <S.Box rank={Rank}>
                <S.Left>
                    <S.RankText rank={Rank}>{Rank}</S.RankText>
                </S.Left>
                <S.Middle onPress={() => navigation.navigate('UserDetailStack')}>
                    <S.Header>
                        <S.DistanceText>{Distance}m</S.DistanceText>
                    </S.Header>
                    <S.Body>
                        <S.NickNameText>{Nickname}  </S.NickNameText>
                        <S.LevelText>Lv. {Level}</S.LevelText>
                    </S.Body>
                </S.Middle>
            </S.Box>
        </S.Container>
    );
};

export default RankInfoBox;

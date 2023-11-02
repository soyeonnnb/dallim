import * as S from './ProfileCard.styles';
import {planetData} from '@/recoil/PlanetData';

interface Props {
  PlanetIndex: number;
  Nickname: string;
  UserLevel: number;
  experiencePercentage: number;
}

function ProfileCard({
  PlanetIndex,
  Nickname,
  UserLevel,
  experiencePercentage,
}: Props) {
  return (
    <S.Container>
      <S.CardImageWrapper>
        <S.CardBox source={planetData[PlanetIndex].Card} resizeMode="cover">
          <S.Header>
            <S.LevelText>Level {UserLevel}</S.LevelText>
          </S.Header>
          <S.Body>
            <S.LeftBox>
              <S.NicknameText>{Nickname}</S.NicknameText>
            </S.LeftBox>
            <S.RightBox>
              <S.percentageText>{experiencePercentage}%</S.percentageText>
            </S.RightBox>
          </S.Body>
          <S.Footer>
            <S.ExperienceBox>
              <S.Experience percentage={experiencePercentage}></S.Experience>
            </S.ExperienceBox>
          </S.Footer>
        </S.CardBox>
      </S.CardImageWrapper>
    </S.Container>
  );
}

export default ProfileCard;

import * as S from './Profile.styles';
import React, {useState, useEffect} from 'react';

import ProfileCard from '../../components/profileComponent/ProfileCard';

import NicknameChangeModal from '../../components/profileComponent/profileModal/NicknameChangeModal';
import LogoutModal from '../../components/profileComponent/profileModal/LogoutModal';
import {characterData} from '@/recoil/data/CharacterData';

//icon
import logoutIcon from '@/assets/icons/logout.png';
import TagsIcon from '@/assets/icons/TagsIcon';
import RunningMateIcon from '@/assets/icons/RunningMateIcon';
import RunningAlarmIcon from '@/assets/icons/RunningAlarmIcon';
import WatchIcon from '@/assets/icons/WatchIcon';

//Apis
import {fetchUserProfileCard} from '@/apis/ProfileApi';
import {fetchCompetitorCard} from '@/apis/ProfileApi';

//Toast
import { CustomToast } from '@/components/common/toast/CustomToast';

//Recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  equippedPlanetIndexState,
  userExpState,
  userLevelState,
  userNicknameState,
} from '@/recoil/UserRecoil';
import {competitorDataState} from '@/recoil/RunningRecoil';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

interface ProfileProps {
  navigation: any;
}

function Profile({navigation}: ProfileProps) {
  //State---------------------------------

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);

  const [userNickname, setUserNickname] = useRecoilState(userNicknameState); // 유저 닉네임
  const userLevel = useRecoilValue(userLevelState);
  const userExp = useRecoilValue(userExpState);
  const equippedCharacterIndex = useRecoilValue(equippedCharacterIndexState);
  const equippedEvolutionStage = useRecoilValue(equippedEvolutionStageState);
  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState);

  // 런닝메이트 데이터 저장
  const [competitorData, setCompetitorData] =
    useRecoilState(competitorDataState);

  //useEffect---------------------------------
  useEffect(() => {
    const fetchCompetitorData = async () => {
      try {
        const data = await fetchCompetitorCard();
        setCompetitorData(data); // Recoil 상태를 업데이트합니다.
      } catch (error) {
        console.error('경쟁자 데이터 불러오기 에러 :', error);
      }
    };
    fetchCompetitorData();
  }, [setCompetitorData]);

  //dataCall ---------------------------------
  const selectedCharacter = characterData[equippedCharacterIndex];
  const selectedCharacterLevelData =
    selectedCharacter.Evolutions[equippedEvolutionStage];

  //actions---------
  const handleRunningMatePress = () => {
    if (competitorData.length === 0) {
      // 데이터가 없을 때의 동작
      CustomToast({ type: 'error', text1: '등록된 러닝메이트가 없습니다!' });
    } else {
      // 데이터가 있을 때의 동작
      navigation.navigate('RunningMateSetting', {
        competitorData: competitorData,
      });
    }
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover">
        <S.Header>
          <S.TitleProfileBox>
            <S.Text>마이페이지</S.Text>
            <S.DeleteButtonBox onPress={() => setShowLogoutModal(true)}>
              <S.Logout source={logoutIcon} />
            </S.DeleteButtonBox>
          </S.TitleProfileBox>
          <S.ProfileBox>
            <ProfileCard
              PlanetIndex={equippedPlanetIndex}
              Nickname={userNickname}
              UserLevel={userLevel}
              experiencePercentage={userExp}
            />
          </S.ProfileBox>
        </S.Header>

        <S.Body>
          <S.SetBox>
            <S.ButtonContainer>
              <S.BoxShadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.2)"
                endColor="rgba(0, 0, 0, 0.2)"
                offset={[4, 4]}>
                <S.ButtonBox onPress={() => setShowNicknameChangeModal(true)}>
                  <S.NickNameShadow
                    distance={4}
                    startColor="rgba(126,76,119, 0.8)"
                    endColor="rgba(207,100,100,0.5)"
                    offset={[0, 0]}>
                    <S.IconBox>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['#F78787', '#EF5656']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 300,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 40,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                            position: 'absolute',
                          }}
                          colors={[
                            'rgba(140,130,126,0.3)',
                            'rgba(235,223,138,1)',
                          ]}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 60]}></RadialGradient>
                        <TagsIcon
                          width={50}
                          height={50}
                          color="white"></TagsIcon>
                      </LinearGradient>
                    </S.IconBox>
                  </S.NickNameShadow>
                  <S.EmptyBox></S.EmptyBox>
                  <S.TextBox>
                    <S.ButtonText>닉네임 변경</S.ButtonText>
                  </S.TextBox>
                </S.ButtonBox>
              </S.BoxShadow>
              <S.BoxShadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.2)"
                endColor="rgba(0, 0, 0, 0.2)"
                offset={[4, 4]}>
                <S.ButtonBox onPress={handleRunningMatePress}>
                  <S.RunningMateShadow
                    distance={2}
                    startColor="rgba(140,130,126, 0.8)"
                    endColor="rgba(235,223,138,0.5)"
                    offset={[0, 0]}>
                    <S.RunningIconBox>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['#FDEB71', '#F8D800']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 300,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 40,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                            position: 'absolute',
                          }}
                          colors={[
                            'rgba(255,255,255,0.3)',
                            'rgba(207,100,100,0.8)',
                          ]}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 60]}></RadialGradient>
                        <RunningMateIcon width={50} height={50} color="white" />
                      </LinearGradient>
                    </S.RunningIconBox>
                  </S.RunningMateShadow>

                  <S.TextBox>
                    <S.ButtonText>러닝메이트</S.ButtonText>
                  </S.TextBox>
                </S.ButtonBox>
              </S.BoxShadow>
            </S.ButtonContainer>
            <S.ButtonContainer>
              <S.BoxShadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.2)"
                endColor="rgba(0, 0, 0, 0.2)"
                offset={[4, 4]}>
                <S.ButtonBox
                  onPress={() => navigation.navigate('RunningAlarm')}>
                  <S.AlarmIconBox>
                    <RunningAlarmIcon width={50} height={50} color="white" />
                  </S.AlarmIconBox>
                  <S.TextBox>
                    <S.ButtonText>운동알림</S.ButtonText>
                  </S.TextBox>
                </S.ButtonBox>
              </S.BoxShadow>
              <S.BoxShadow
                distance={2}
                startColor="rgba(0, 0, 0, 0.2)"
                endColor="rgba(0, 0, 0, 0.2)"
                offset={[4, 4]}>
                <S.ButtonBox
                  onPress={() => navigation.navigate('WatchConnection')}>
                  <S.WatchIconBox>
                    <WatchIcon width={50} height={50} color="white" />
                  </S.WatchIconBox>
                  <S.TextBox>
                    <S.ButtonText>워치</S.ButtonText>
                  </S.TextBox>
                </S.ButtonBox>
              </S.BoxShadow>
            </S.ButtonContainer>
          </S.SetBox>
        </S.Body>

        <S.TabBox />
      </S.BackgroundImage>
      {/*  */}
      <S.ImageBox>
        <S.CharacterImage
          source={selectedCharacterLevelData.Main}
          resizeMode="contain"
        />
      </S.ImageBox>

      <LogoutModal
        showModal={showLogoutModal}
        toggleModal={() => setShowLogoutModal(!showLogoutModal)}
      />

      <NicknameChangeModal
        showModal={showNicknameChangeModal}
        toggleModal={() => setShowNicknameChangeModal(!showNicknameChangeModal)}
        Nickname={userNickname}
      />
    </S.Container>
  );
}

export default Profile;

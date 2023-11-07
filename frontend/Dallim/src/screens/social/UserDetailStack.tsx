import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import * as S from './UserDetailStack.styles';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';

import RunningDataBox from '@/components/socialComponent/RunningDataBox';
import VersusModal from '@/components/socialComponent/socialModal/VersusModal';
import SocialCard from '@/components/socialComponent/SocialCard';
import { characterData } from '@/recoil/CharacterData';
import { fetchUserRecord } from '@/apis/SocialApi';
import { Animated } from 'react-native';

interface UserDetailStackProps {
    navigation: any;
    route: {
        params: {
            userId: number;
        };
    };
}

interface RunningRecord {
    id: string;
    userId: number;
    location: string;
    createdAt: string;
    totalDistance: number;
    totalTime: number;
    averageSpeed: number;
    registration: boolean;
}

interface UserDetails {
    characterIndex: number;
    planetIndex: number;
    nickname: string;
    level: number;
    exp: number;
    evolutionStage: number;
    runningRecordOverviews: RunningRecord[];
}

function UserDetailStack({ navigation, route }: UserDetailStackProps) {
    const userId = route.params.userId;

    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));  // 초기 투명도 0
    const [buttonFadeAnim] = useState(new Animated.Value(0));

    const fetchUserDetails = async () => {
        setIsLoading(true);
        try {
            const details: UserDetails = await fetchUserRecord(userId);
            setUserDetails(details);
            setIsLoading(false);
        } catch (error) {
            console.error("유저 상세기록 가져오기 실패", error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const selectedCharacterIndex = userDetails ? userDetails.characterIndex : 0;
    const selectedPlanetIndex = userDetails ? userDetails.planetIndex : 0;
    const selectedNickname = userDetails ? userDetails.nickname : '';
    const selectedLevel = userDetails ? userDetails.level : 0;
    const selectedExp = userDetails ? userDetails.exp : 0;
    const selectedEvolutionStage = userDetails ? userDetails.evolutionStage : 0;
    const runningRecords = userDetails ? userDetails.runningRecordOverviews : [];

    const selectedCharacter = characterData[selectedCharacterIndex];
    const selectedCharacterLevelData = selectedCharacter.evolutions[selectedEvolutionStage];

    async function handleSend() {
        try {
            setVersusModalVisible(true);
        } catch (error) {
            console.error("Error retrieving data", error);
        }
    };

    // 드롭다운
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState("최신 순서");

    // Versus 모달
    const [isVersusModalVisible, setVersusModalVisible] = useState(false);

    // 런닝메이트 등록시 발생
    const handleUpdateRegistration = (idToUpdate: string) => {
        // runningRecords 배열을 순환하면서 id가 idToUpdate와 일치하는 레코드를 찾기
        const updatedRecords = runningRecords.map(record => {
            if (record.id === idToUpdate) {
                // 일치하는 레코드의 registration 속성을 true로 업데이트
                return { ...record, registration: true };
            }
            return record;
        });
        if (userDetails) {
            const updatedUserDetails: UserDetails = {
                ...userDetails,
                runningRecordOverviews: updatedRecords,
            };
            setUserDetails(updatedUserDetails);
        }
    };

    // 로딩 애니메이션
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    // '비교하기' 버튼 애니메이션
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(buttonFadeAnim, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonFadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []); 


    return (
        <S.Container>
            <S.BackgroundImage source={require('@/assets/images/MainBackground4.png')}
                resizeMode="cover">
                {isLoading ? (
                    <S.LoadingBox>
                        <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText>
                    </S.LoadingBox>
                ) : (
                    <>
                        <S.Header>
                            <S.CloseButton onPress={() => navigation.navigate('Social')}>
                                <S.CloseImage source={CloseIcon} />
                            </S.CloseButton>
                            <S.HeaderBox>
                                <S.DetailText>상세보기</S.DetailText>
                            </S.HeaderBox>
                            <S.VersusBox>
                                <S.VersusButton onPress={handleSend} >
                                    <S.AnimatedVersusText style={{ opacity: buttonFadeAnim }}>비교하기</S.AnimatedVersusText>
                                </S.VersusButton>

                            </S.VersusBox>
                        </S.Header>
                        <S.Body>
                            <S.ProfileBox>
                                <SocialCard 
                                    userId={userId}
                                    planetIndex={selectedPlanetIndex}
                                    nickname={selectedNickname}
                                    userLevel={selectedLevel}
                                    experiencePercentage={selectedExp}
                                />
                            </S.ProfileBox>

                        </S.Body>

                        <S.Footer>
                            <S.FooterTop>
                                <S.RecordTitleBox>
                                    <S.RecordTitle>달림기록</S.RecordTitle>
                                </S.RecordTitleBox>
                                <S.FooterLine>
                                    <S.Line />
                                </S.FooterLine>
                                <S.SortBox>
                                    <S.Sort onPress={() => setDropdownVisible(!dropdownVisible)}>
                                        <S.SortText>{selectedSort}</S.SortText>
                                        {/* 드랍다운 예정 */}
                                        {/* {dropdownVisible && (
                                    <S.DropdownMenu>
                                        <S.DropdownItem onPress={() => { setSelectedSort("최신순"); setDropdownVisible(false); }}><S.DropdownItemText>최신 순서</S.DropdownItemText></S.DropdownItem>
                                        <S.DropdownItem onPress={() => { setSelectedSort("속력순"); setDropdownVisible(false); }}><S.DropdownItemText>속력 순서</S.DropdownItemText></S.DropdownItem>
                                        <S.DropdownItem onPress={() => { setSelectedSort("운동시간순"); setDropdownVisible(false); }}><S.DropdownItemText>운동시간 순서</S.DropdownItemText></S.DropdownItem>
                                    </S.DropdownMenu>
                                )} */}
                                    </S.Sort>
                                </S.SortBox>
                            </S.FooterTop>
                            <S.FooterList>
                                <ScrollView >
                                    {runningRecords.map((record: RunningRecord, index: number) => (
                                        <S.RunBox key={record.id}>
                                            <RunningDataBox {...record} id={record.id} onUpdateRegistration={handleUpdateRegistration} />
                                        </S.RunBox>
                                    ))}
                                </ScrollView>
                            </S.FooterList>

                        </S.Footer>

                        <S.TabBox />

                        <S.ImageBox >
                            <S.CharacterTouch onPress={handleSend} activeOpacity={0.7}>
                                <S.CharacterImage
                                    source={selectedCharacterLevelData.front}
                                    resizeMode="contain"
                                />
                            </S.CharacterTouch>
                        </S.ImageBox>

                        <VersusModal
                            isVisible={isVersusModalVisible}
                            onClose={() => setVersusModalVisible(false)}
                            userId={userId}
                        />
                    </>
                )}
            </S.BackgroundImage>

        </S.Container >
    );
};

export default UserDetailStack;

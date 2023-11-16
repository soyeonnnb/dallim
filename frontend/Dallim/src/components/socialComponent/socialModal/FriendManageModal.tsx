import React, {useEffect, useRef, useState} from 'react';
import {Modal, ScrollView} from 'react-native';
import * as S from './FriendManageModal.styles';
import CloseIcon from '@/assets/icons/CloseIcon_3.png';
import NoFriendImage from '@/assets/images/NoFriend.png';
import NoSearchImage from '@/assets/images/NoSearch.png';
import NoRequestImage from '@/assets/images/NoRequest.png';
// import SearchIcon from '@/assets/icons/SearchIcon.png';
import SearchIcon from '@/assets/icons/SearchIcon';
import FriendBox from '../FriendBox';
import UserBox from '../UserBox';
import {
  fetchFriendList,
  fetchFriendWaitList,
  fetchUserSearch,
} from '@/apis/SocialApi';
import {Animated, TextInput} from 'react-native';

import {useRecoilState} from 'recoil';
import {friendRequestsState, friendsState} from '@/recoil/FriendRecoil';
import WaitBox from '../WaitBox';

type User = {
  userId: number;
  characterIndex: number;
  evolutionStage: number;
  nickname: string;
  level: number;
  isFollower: boolean;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const FriendManageModal: React.FC<Props> = ({isVisible, onClose}) => {
  const [viewState, setViewState] = useState('friends');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const [friends, setFriends] = useRecoilState(friendsState);
  const [loading, setLoading] = useState<boolean>(true);

  const [friendRequests, setFriendRequests] =
    useRecoilState(friendRequestsState);

  const [fadeAnim] = useState(new Animated.Value(0)); // 초기 투명도 0

  const Search = ({onSearch}: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<TextInput>(null);

    // 검색 핸들러 함수 수정
    const handleNicknameSearch = () => {
      onSearch(searchQuery);
      setSearchQuery('');
      inputRef.current?.clear();
    };

    return (
      <S.Search>
        <S.SearchLeft>
          <S.SearchBox>
            <S.SearchInput
              ref={inputRef}
              value={searchQuery}
              placeholder="닉네임을 입력해주세요."
              onChangeText={setSearchQuery}
              onSubmitEditing={handleNicknameSearch}
            />
          </S.SearchBox>
        </S.SearchLeft>
        <S.SearchRight>
          <S.SendButton onPress={handleNicknameSearch}>
            {/* <S.SearchIcon source={SearchIcon} resizeMode="contain" /> */}
            <SearchIcon width={30} height={30} color="#35306B"></SearchIcon>
          </S.SendButton>
        </S.SearchRight>
      </S.Search>
    );
  };

  const handleUserSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetchUserSearch(query);
      setSearchResults(response.length > 0 ? response : []);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 친구 리스트 가져오기 (Axios)
  useEffect(() => {
    const getFriends = async () => {
      try {
        setLoading(true); // 로딩 상태를 true
        const friendsData = await fetchFriendList();
        // console.log(friendsData);
        setFriends(friendsData);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false); // 데이터를 받아온 후 로딩 상태를 false
      }
    };
    if (isVisible) {
      getFriends();
    }
  }, [isVisible, setFriends]);

  // 받은 요청 목록 조회 (Axios)
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        setLoading(true);
        const waitData = await fetchFriendWaitList();
        setFriendRequests(waitData);
        // console.log('받은 요청 목록 조회 성공');
      } catch (error) {
        // console.error('받은 요청 목록 조회 실패', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchFriendRequests();
    }
  }, [isVisible, setFriendRequests]);

  useEffect(() => {
    // 무한 반복하는 페이드 애니메이션
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

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <S.AnimatedFooterText style={{opacity: fadeAnim}}>
            로딩 중...
          </S.AnimatedFooterText>
        </>
      );
    }
    switch (viewState) {
      case 'search':
        return (
          <>
            <Search onSearch={handleUserSearch} />
            {searchResults.length > 0 || searchResults === null ? (
              <>
                <ScrollView>
                  {searchResults.map(user => (
                    <S.UserBox key={user.userId}>
                      <UserBox {...user} />
                    </S.UserBox>
                  ))}
                </ScrollView>
              </>
            ) : (
              <>
                <S.EmptyImage source={NoSearchImage} resizeMode="contain" />
                <S.EmptyText>검색된 유저가 없어요.</S.EmptyText>
                <S.EmptyText style={{marginTop: 5}}>
                  정확한 유저의 닉네임을 입력해주세요.
                </S.EmptyText>
              </>
            )}
          </>
        );
      case 'friends':
        return friends.length > 0 ? (
          <ScrollView>
            {friends.map(friend => (
              <S.FriendBox key={friend.userId}>
                <FriendBox {...friend} />
              </S.FriendBox>
            ))}
          </ScrollView>
        ) : (
          <>
            <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
            <S.EmptyText style={{marginRight: 10}}>친구가 없어요.</S.EmptyText>
          </>
        );
      case 'requests':
        return friendRequests.length > 0 ? (
          <ScrollView>
            {friendRequests.map(order => (
              <S.WaitBox key={order.userId}>
                <WaitBox {...order} />
              </S.WaitBox>
            ))}
          </ScrollView>
        ) : (
          <>
            <S.EmptyImage source={NoRequestImage} resizeMode="contain" />
            <S.EmptyText style={{marginRight: 10}}>
              받은 요청이 없어요.
            </S.EmptyText>
          </>
        );
      default:
        return null;
    }
  };

  // Tab Box
  const switchView = (newState: string) => {
    setViewState(newState);
  };
  const getHeaderText = () => {
    switch (viewState) {
      case 'search':
        return '친구 검색';
      case 'friends':
        return '친구 목록';
      case 'requests':
        return '받은 요청';
      default:
        return '친구 관리';
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.Header>
            <S.Top>
              <S.TopText>{getHeaderText()}</S.TopText>
            </S.Top>
            <S.ListBox>{renderContent()}</S.ListBox>
          </S.Header>
          <S.Body>
            <S.ViewSelector>
              <S.SelectorButton
                onPress={() => switchView('search')}
                isActive={viewState === 'search'}>
                <S.SelectorText isActive={viewState === 'search'}>
                  유저 검색
                </S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton
                onPress={() => switchView('friends')}
                isActive={viewState === 'friends'}>
                <S.SelectorText isActive={viewState === 'friends'}>
                  친구 목록
                </S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton
                onPress={() => switchView('requests')}
                isActive={viewState === 'requests'}>
                <S.SelectorText isActive={viewState === 'requests'}>
                  받은 요청
                </S.SelectorText>
              </S.SelectorButton>
            </S.ViewSelector>
          </S.Body>

          <S.Footer>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} resizeMode="contain" />
            </S.CloseButton>
          </S.Footer>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
};

export default FriendManageModal;

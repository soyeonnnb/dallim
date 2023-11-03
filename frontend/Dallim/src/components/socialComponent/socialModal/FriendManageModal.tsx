import React, { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import * as S from './FriendManageModal.styles';
import CloseIcon from '@/assets/icons/CloseIcon_3.png';
import NoFriendImage from '@/assets/images/NoFriend.png';
import NoSearchImage from '@/assets/images/NoSearch.png';
import SearchIcon from '@/assets/icons/SearchIcon.png';
import FriendBox from '../FriendBox';
import UserBox from '../UserBox';
import { fetchFriendList, fetchFriendWaitList, fetchUserSearch } from '@/apis/SocialApi';
import { Animated, TextInput } from 'react-native';

import { useRecoilState } from 'recoil';
import { friendRequestsState, friendsState } from '@/recoil/FriendRecoil';
import WaitBox from '../WaitBox';

type Friend = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
};

type User = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
  isFollower: boolean;
};


type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const FriendManageModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const [viewState, setViewState] = useState('friends');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [friends, setFriends] = useRecoilState(friendsState);
  const [loading, setLoading] = useState<boolean>(true);

  const [friendRequests, setFriendRequests] = useRecoilState(friendRequestsState);

  const [fadeAnim] = useState(new Animated.Value(0));  // 초기 투명도 0

  // 규호형해주세요규호형해주세요규호형해주세요규호형해주세요규호형해주세요규호형해주세요규호형해주세요
  const Search = () => {
    const inputRef = useRef<TextInput>(null);

    // 검색 핸들러 함수 수정
    const handleNicknameSearch = async () => {
      try {
        setLoading(true);
        const response = await fetchUserSearch(searchQuery);
        setSearchResults(response.length > 0 ? response : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        // 검색 후에만 searchQuery 상태를 비웁니다
        setSearchQuery('');
        // TextInput 필드를 비웁니다.
        inputRef.current?.clear();
      }
    };

    return (
      <S.Search>
        <S.SearchLeft>
          <S.SearchBox
            ref={inputRef} // ref 할당
            value={searchQuery} // value를 searchQuery 상태로 설정
            placeholder="닉네임을 입력해주세요."
            onChangeText={setSearchQuery} // 입력값 변경 시 searchQuery 상태 업데이트
            onSubmitEditing={handleNicknameSearch} // 키보드에서 Enter를 눌렀을 때 검색 실행
            returnKeyType="search"
          />
        </S.SearchLeft>
        <S.SearchRight>
          <S.SendButton onPress={handleNicknameSearch}>
            <S.SearchIcon source={SearchIcon} resizeMode='contain' />
          </S.SendButton>
        </S.SearchRight>
      </S.Search>
    );
  };

  // 친구 리스트 가져오기 (Axios)
  useEffect(() => {
    const getFriends = async () => {
      try {
        setLoading(true); // 로딩 상태를 true
        const friendsData = await fetchFriendList();
        setFriends(friendsData);
      } catch (error) {
        console.error(error);
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
        console.log('받은 요청 목록 조회 성공');
      } catch (error) {
        console.error('받은 요청 목록 조회 실패', error);
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
          <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText>

        </>
      )
    }
    switch (viewState) {
      case 'search':
        return (
          <>
            <Search />
            {((searchResults.length > 0) || (searchResults === null)) ? (
              <>
                <ScrollView>
                  {searchResults.map((user) => (
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
                <S.EmptyText style={{ marginTop: 5 }}>정확한 유저의 닉네임을 입력해주세요.</S.EmptyText>
              </>
            )}
          </>
        );
      case 'friends':
        return friends.length > 0 ? (
          <ScrollView>
            {friends.map((friend) => (
              <S.FriendBox key={friend.userId}>
                <FriendBox {...friend} />
              </S.FriendBox>
            ))}
          </ScrollView>
        ) : (
          <>
            <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
            <S.EmptyText style={{ marginRight: 10 }}>친구가 없어요.</S.EmptyText>
          </>
        );
      case 'requests':
        return friendRequests.length > 0 ? (
          <ScrollView>
            {friendRequests.map((order) => (
              <S.WaitBox key={order.userId}>
                <WaitBox {...order} />
              </S.WaitBox>
            ))}
          </ScrollView>
        ) : (
          <>
            <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
            <S.EmptyText style={{ marginRight: 10 }}>친구 요청이 없어요.</S.EmptyText>
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
        return '유저 검색';
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
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <S.Header>
            <S.Top>
              <S.TopText>{getHeaderText()}</S.TopText>
            </S.Top>
            <S.ListBox>
              {renderContent()}
            </S.ListBox>
          </S.Header>
          <S.Body>
            <S.ViewSelector>
              <S.SelectorButton onPress={() => switchView('search')} isActive={viewState === 'search'}>
                <S.SelectorText>유저 검색</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('friends')} isActive={viewState === 'friends'}>
                <S.SelectorText>친구 목록</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('requests')} isActive={viewState === 'requests'}>
                <S.SelectorText>받은 요청</S.SelectorText>
              </S.SelectorButton>
            </S.ViewSelector>
          </S.Body>

          <S.Footer>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} resizeMode='contain' />
            </S.CloseButton>

          </S.Footer>

        </S.ModalContent>
      </S.ModalContainer>
    </Modal>


  );


};

export default FriendManageModal;

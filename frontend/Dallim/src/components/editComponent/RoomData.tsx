export type RoomType = {
  Room: any;
  Theme: any;
  ThemeCard: any;
}

// 임시 저장된 룸 인덱스
export const selectedRoom = {
  index: 2
}

export const backgroundImage = {
  image: require('../../assets/images/MainBackground3.png')
};

// Index : 색깔
// 0: 검정, 1: 노랑, 2: 파랑, 3: 보라, 4: 빨강
export const roomData: RoomType[] = [
  {
    Room: require('../../assets/Theme/RoomSample_1.png'),
    Theme: require('../../assets/Theme/ThemeBlack.png'),
    ThemeCard: require('../../assets/Theme/ThemeCardBlack.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_2.png'),
    Theme: require('../../assets/Theme/ThemeYellow.png'),
    ThemeCard: require('../../assets/Theme/ThemeCardYellow.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_3.png'),
    Theme: require('../../assets/Theme/ThemeBlue.png'),
    ThemeCard: require('../../assets/Theme/ThemeCardBlue.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_3.png'),
    Theme: require('../../assets/Theme/ThemePurple.png'),
    ThemeCard: require('../../assets/Theme/ThemeCardPurple.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_3.png'),
    Theme: require('../../assets/Theme/ThemeRed.png'),
    ThemeCard: require('../../assets/Theme/ThemeCardRed.png')
  },
];

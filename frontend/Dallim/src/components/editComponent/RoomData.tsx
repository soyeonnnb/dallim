export type RoomType = {
  Room: any;
  Theme: any;
}

export const backgroundImage = {
  image: require('../../assets/images/MainBackground3.png')
};

export const roomData: RoomType[] = [
  {
    Room: require('../../assets/Theme/RoomSample_1.png'),
    Theme: require('../../assets/character/토끼_배경.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_2.png'),
    Theme: require('../../assets/character/펭귄_배경.png')
  },
  {
    Room: require('../../assets/Theme/RoomSample_3.png'),
    Theme: require('../../assets/character/병아리_배경.png')
  },
];

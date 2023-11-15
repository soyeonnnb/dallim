export type PlanetType = {
  Main: any; // 정명 이미지
  Card: any; 
  Cardtwo: any;
  watch: any;
  Rotate: any; // 빙글빙글 gif
};

// 대표 백그라운드
export const backgroundImage : any = {
  Image: require('@/assets/images/MainBackground.png'),
}; 

// Index(색깔) 0: Black, 1: Yellow, 2: Blue, 3: Purple, 4: Red
export const planetData: PlanetType[] = [
  {
    Main: require('@/assets/images/planets/main/PlanetBlack.png'),
    Card: require('@/assets/images/planets/card/CardBlack.png'),
    Cardtwo: require('@/assets/images/planets/cardTwo/CardTwoBlack.png'),
    watch: require('@/assets/images/planets/watch/WatchBlack.png'),
    Rotate: require('@/assets/images/planets/rotate/RotateBlack.gif'),
  },
  {
    Main: require('@/assets/images/planets/main/PlanetYellow.png'),
    Card: require('@/assets/images/planets/card/CardYellow.png'),
    Cardtwo: require('@/assets/images/planets/cardTwo/CardTwoYellow.png'),
    watch: require('@/assets/images/planets/watch/WatchYellow.png'),
    Rotate: require('@/assets/images/planets/rotate/RotateBlack.gif'), // check
  },
  {
    Main: require('@/assets/images/planets/main/PlanetBlue.png'),
    Card: require('@/assets/images/planets/card/CardBlue.png'),
    Cardtwo: require('@/assets/images/planets/cardTwo/CardTwoBlue.png'),
    watch: require('@/assets/images/planets/watch/WatchBlue.png'),
    Rotate: require('@/assets/images/planets/rotate/RotateBlack.gif'), // check
  },
  {
    Main: require('@/assets/images/planets/main/PlanetPurple.png'),
    Card: require('@/assets/images/planets/card/CardPurple.png'),
    Cardtwo: require('@/assets/images/planets/cardTwo/CardTwoPurple.png'),
    watch: require('@/assets/images/planets/watch/WatchPurple.png'),
    Rotate: require('@/assets/images/planets/rotate/RotateBlack.gif'), // check
  },
  {
    Main: require('@/assets/images/planets/main/PlanetRed.png'),
    Card: require('@/assets/images/planets/card/CardRed.png'),
    Cardtwo: require('@/assets/images/planets/cardTwo/CardTwoRed.png'),
    watch: require('@/assets/images/planets/watch/WatchRed.png'),
    Rotate: require('@/assets/images/planets/rotate/RotateBlack.gif'), // check
  },
];

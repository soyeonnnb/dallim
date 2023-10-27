export type PlanetType = {
  Planet: any;
  Theme: any;
  Card: any;
}

// 임시 저장된 룸 인덱스
export const selectedPlanet = {
  index: 2
}

export const backgroundImage = {
  image: require('../../assets/images/MainBackground3.png')
};

// Index : 색깔
// 0: 검정, 1: 노랑, 2: 파랑, 3: 보라, 4: 빨강
export const planetData: PlanetType[] = [
  {
    Planet: require('../../assets/Theme/PlanetBlack.png'),
    Theme: require('../../assets/Theme/ThemeBlack.png'),
    Card: require('../../assets/Theme/CardBlack.png')
  },
  {
    Planet: require('../../assets/Theme/PlanetYellow.png'),
    Theme: require('../../assets/Theme/ThemeYellow.png'),
    Card: require('../../assets/Theme/CardYellow.png')
  },
  {
    Planet: require('../../assets/Theme/PlanetBlue.png'),
    Theme: require('../../assets/Theme/ThemeBlue.png'),
    Card: require('../../assets/Theme/CardBlue.png')
  },
  {
    Planet: require('../../assets/Theme/PlanetPurple.png'),
    Theme: require('../../assets/Theme/ThemePurple.png'),
    Card: require('../../assets/Theme/CardPurple.png')
  },
  {
    Planet: require('../../assets/Theme/PlanetRed.png'),
    Theme: require('../../assets/Theme/ThemeRed.png'),
    Card: require('../../assets/Theme/CardRed.png')
  },
];

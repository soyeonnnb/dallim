export type PlanetType = {
  Planet: any;
  Theme: any;
  Card: any;
}

export const backgroundImage = {
  image: require('../../assets/images/MainBackground3.png')
};

// Index : 색깔
// 0: 검정, 1: 노랑, 2: 파랑, 3: 보라, 4: 빨강
export const planetData: PlanetType[] = [
  {
    Planet: require('../../assets/planets/PlanetBlack.png'),
    Theme: require('../../assets/planets/ThemeBlack.png'),
    Card: require('../../assets/planets/CardBlack.png')
  },
  {
    Planet: require('../../assets/planets/PlanetYellow.png'),
    Theme: require('../../assets/planets/ThemeYellow.png'),
    Card: require('../../assets/planets/CardYellow.png')
  },
  {
    Planet: require('../../assets/planets/PlanetBlue.png'),
    Theme: require('../../assets/planets/ThemeBlue.png'),
    Card: require('../../assets/planets/CardBlue.png')
  },
  {
    Planet: require('../../assets/planets/PlanetPurple.png'),
    Theme: require('../../assets/planets/ThemePurple.png'),
    Card: require('../../assets/planets/CardPurple.png')
  },
  {
    Planet: require('../../assets/planets/PlanetRed.png'),
    Theme: require('../../assets/planets/ThemeRed.png'),
    Card: require('../../assets/planets/CardRed.png')
  },
];

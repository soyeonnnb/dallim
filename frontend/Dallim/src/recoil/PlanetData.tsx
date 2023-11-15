export type PlanetType = {
  Planet: any;
  Card: any;
  watch: any;
  Cardtwo: any;
  Rotate: any;
};

export const backgroundImage = {
  image: require('@/assets/images/MainBackground3.png'),
};

// Index(색깔) 0: Black, 1: Yellow, 2: Blue, 3: Purple, 4: Red
export const planetData: PlanetType[] = [
  {
    Planet: require('@/assets/planets/PlanetBlack.png'),
    Card: require('@/assets/planets/CardBlack.png'),
    Cardtwo: require('@/assets/planets/ColumnCard/blackColumnCard.png'),
    watch: require('@/assets/planets/WatchBlack.png'),
    Rotate: require('@/assets/planets/Rotate/PlanetBlack.gif'),
  },
  {
    Planet: require('@/assets/planets/PlanetYellow.png'),
    Card: require('@/assets/planets/CardYellow.png'),
    Cardtwo: require('@/assets/planets/ColumnCard/yellowColumnCard.png'),
    watch: require('@/assets/planets/WatchYellow.png'),
    Rotate: require('@/assets/planets/Rotate/PlanetBlack.gif'),
  },
  {
    Planet: require('@/assets/planets/PlanetBlue.png'),
    Card: require('@/assets/planets/CardBlue.png'),
    Cardtwo: require('@/assets/planets/ColumnCard/blueColumnCard.png'),
    watch: require('@/assets/planets/WatchBlue.png'),
    Rotate: require('@/assets/planets/Rotate/PlanetBlack.gif'),
  },
  {
    Planet: require('@/assets/planets/PlanetPurple.png'),
    Card: require('@/assets/planets/CardPurple.png'),
    Cardtwo: require('@/assets/planets/ColumnCard/purpleColumnCard.png'),
    watch: require('@/assets/planets/WatchPurple.png'),
    Rotate: require('@/assets/planets/Rotate/PlanetBlack.gif'),
  },
  {
    Planet: require('@/assets/planets/PlanetRed.png'),
    Card: require('@/assets/planets/CardRed.png'),
    Cardtwo: require('@/assets/planets/ColumnCard/redColumnCard.png'),
    watch: require('@/assets/planets/WatchRed.png'),
    Rotate: require('@/assets/planets/Rotate/PlanetBlack.gif'),
  },
];

export type LevelType = {
    Base: any;
    Name: any;
};

// Index(레벨) 0: 1~10, 1: 11~20, 2: 21~30, 3: 31~40, 4: 41~50
export const LevelData: LevelType[] = [
    {
        Base: require('@/assets/images/levels/baseBadge'),
        Name: require('@/assets/images/planets/card/CardBlack.png'),
    },
    {
        Base: require('@/assets/images/planets/main/PlanetBlack.png'),
        Name: require('@/assets/images/planets/card/CardBlack.png'),
    },
    {
        Base: require('@/assets/images/planets/main/PlanetBlack.png'),
        Name: require('@/assets/images/planets/card/CardBlack.png'),
    },
    {
        Base: require('@/assets/images/planets/main/PlanetBlack.png'),
        Name: require('@/assets/images/planets/card/CardBlack.png'),
    },
    {
        Base: require('@/assets/images/planets/main/PlanetBlack.png'),
        Name: require('@/assets/images/planets/card/CardBlack.png'),
    },
];

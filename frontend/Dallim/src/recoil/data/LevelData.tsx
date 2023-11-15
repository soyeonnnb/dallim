export type LevelType = {
    Base: any;
    Name: any;
};

// Index(레벨) 0: 1~10, 1: 11~20, 2: 21~30, 3: 31~40, 4: 41~50
export const LevelData: LevelType[] = [
    {
        Base: require('@/assets/images/levels/baseBadge/BaseFirst.png'),
        Name: require('@/assets/images/levels/nameBadge/NameFirst.png'),
    },
    {
        Base: require('@/assets/images/levels/baseBadge/BaseSecond.png'),
        Name: require('@/assets/images/levels/nameBadge/NameSecond.png'),
    },
    
    {
        Base: require('@/assets/images/levels/baseBadge/BaseThird.png'),
        Name: require('@/assets/images/levels/nameBadge/NameThird.png'),
    },
    {
        Base: require('@/assets/images/levels/baseBadge/BaseFourth.png'),
        Name: require('@/assets/images/levels/nameBadge/NameFourth.png'),
    },
    {
        Base: require('@/assets/images/levels/baseBadge/BaseFifth.png'),
        Name: require('@/assets/images/levels/nameBadge/NameFifth.png'),
    },
];

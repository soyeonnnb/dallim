// 각 캐릭터 레벨의 상태를 나타내는 타입
export type CharacterLevel = {
  Main: any; // 정면 사진
  RunRight: any; // 오른쪽으로 러닝 gif
  RunFront: any; // 앞으로 러닝 gif
  Badge: any; // 프로필 사진
};

// 각 캐릭터의 정보를 나타내는 타입
export type CharacterType = {
  Evolutions: CharacterLevel[]; // 레벨별 캐릭터 정보
  Background: any; // 캐릭터의 배경
};

// 전체 캐릭터 데이터 characterData[캐릭터 인덱스][해당 캐릭터 레벨][앞모습 or 뛰는모습]
export const characterData: CharacterType[] = [
  {
    Evolutions: [
      {
        Main: require('@/assets/images/characters/main/RabbitEgg.png'),
        RunRight: require('@/assets/images/characters/runRight/RabbitEgg_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/RabbitEgg_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgeRabbitEgg.png'),
      },
      {
        Main: require('@/assets/images/characters/main/Rabbit.png'),
        RunRight: require('@/assets/images/characters/runRight/Rabbit_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/Rabbit_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgeRabbit.png'),
      },
    ],
    Background: require('@/assets/images/characters/background/Rabbit_Background.png'),
  },
  {
    Evolutions: [
      {
        Main: require('@/assets/images/characters/main/PenguinEgg.png'),
        RunRight: require('@/assets/images/characters/runRight/PenguinEgg_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/PenguinEgg_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgePenguinEgg.png'),
      },
      {
        Main: require('@/assets/images/characters/main/Penguin.png'),
        RunRight: require('@/assets/images/characters/runRight/Penguin_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/Penguin_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgePenguin.png'),
      },
    ],
    Background: require('@/assets/images/characters/background/Penguin_Background.png'),
  },
  {
    Evolutions: [
      {
        Main: require('@/assets/images/characters/main/PandaEgg.png'),
        RunRight: require('@/assets/images/characters/runRight/PandaEgg_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/PandaEgg_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgePandaEgg.png'),
      },
      {
        Main: require('@/assets/images/characters/main/Panda.png'),
        RunRight: require('@/assets/images/characters/runRight/Panda_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/Panda_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgePanda.png'),
      },
    ],
    Background: require('@/assets/images/characters/background/Panda_Background.png'),
  },
  {
    Evolutions: [
      {
        Main: require('@/assets/images/characters/main/ChickEgg.png'),
        RunRight: require('@/assets/images/characters/runRight/ChickEgg_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/ChickEgg_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgeChickEgg.png'),
      },
      {
        Main: require('@/assets/images/characters/main/Chick.png'),
        RunRight: require('@/assets/images/characters/runRight/Chick_RunRight.gif'),
        RunFront: require('@/assets/images/characters/runFront/Chick_RunFront.gif'),
        Badge: require('@/assets/images/characters/badge/BadgeChick.png'),
      },
    ],
    Background: require('@/assets/images/characters/background/Chick_Background.png'),
  },
];

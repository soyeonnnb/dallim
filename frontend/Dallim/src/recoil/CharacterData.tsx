// 각 캐릭터 레벨의 상태를 나타내는 타입
export type CharacterLevel = {
  front: any; // 정면 사진
  running: any; // 뛰는 gif
  profile: any; //프로필 사진
};

// 각 캐릭터의 정보를 나타내는 타입
export type CharacterType = {
  evolutions: CharacterLevel[]; // 레벨별 캐릭터 정보
  background: any; // 캐릭터의 배경
};

// 전체 캐릭터 데이터 characterData[캐릭터 인덱스][해당 캐릭터 레벨][앞모습 or 뛰는모습]
export const characterData: CharacterType[] = [
  {
    evolutions: [
      {
        front: require('@/assets/characters/RabbitEgg.png'),
        running: require('@/assets/characters/RabbitEgg_Run.gif'),
        profile: require('@/assets/characters/OneRabbit.png'),
      },
      {
        front: require('@/assets/characters/Rabbit.png'),
        running: require('@/assets/characters/Rabbit_Run.gif'),
        profile: require('@/assets/characters/TwoRabbit.png'),
      },
    ],
    background: require('@/assets/characters/Rabbit_Background.png'),
  },
  {
    evolutions: [
      {
        front: require('@/assets/characters/PenguinEgg.png'),
        running: require('@/assets/characters/PenguinEgg_Run.gif'),
        profile: require('@/assets/characters/OnePenguin.png'),
      },
      {
        front: require('@/assets/characters/Penguin.png'),
        running: require('@/assets/characters/Penguin_Run.gif'),
        profile: require('@/assets/characters/TwoPenguin.png'),
      },
    ],
    background: require('@/assets/characters/Penguin_Background.png'),
  },
  {
    evolutions: [
      {
        front: require('@/assets/characters/PandaEgg.png'),
        running: require('@/assets/characters/PandaEgg_Run.gif'),
        profile: require('@/assets/characters/OnePanda.png'),
      },
      {
        front: require('@/assets/characters/Panda.png'),
        running: require('@/assets/characters/Panda_Run.gif'),
        profile: require('@/assets/characters/TwoPanda.png'),
      },
    ],
    background: require('@/assets/characters/Panda_Background.png'),
  },
  {
    evolutions: [
      {
        front: require('@/assets/characters/ChickEgg.png'),
        running: require('@/assets/characters/ChickEgg_Run.gif'),
        profile: require('@/assets/characters/OneChick.png'),
      },
      {
        front: require('@/assets/characters/Chick.png'),
        running: require('@/assets/characters/Chick_Run.gif'),
        profile: require('@/assets/characters/TwoChick.png'),
      },
    ],
    background: require('@/assets/characters/Chick_Background.png'),
  },
];

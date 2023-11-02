// 각 캐릭터 레벨의 상태를 나타내는 타입
export type CharacterLevel = {
  front: any; // 정면 사진
  running: any; // 뛰는 gif
};

// 각 캐릭터의 정보를 나타내는 타입
export type CharacterType = {
  levels: CharacterLevel[]; // 레벨별 캐릭터 정보
  background: any; // 캐릭터의 배경
};

// 전체 캐릭터 데이터 characterData[캐릭터 인덱스][해당 캐릭터 레벨][앞모습 or 뛰는모습]
export const characterData: CharacterType[] = [
  {
    levels: [
      {
        front: require('@/assets/characters/RabbitEgg.png'),
        running: require('@/assets/characters/RabbitEgg_Run.gif'),
      },
      {
        front: require('@/assets/characters/Rabbit.png'),
        running: require('@/assets/characters/Rabbit_Run.gif'),
      },
    ],
    background: require('@/assets/characters/Rabbit_Background.png'),
  },
  {
    levels: [
      {
        front: require('@/assets/characters/PenguinEgg.png'),
        running: require('@/assets/characters/PenguinEgg_Run.gif'),
      },
      {
        front: require('@/assets/characters/Penguin.png'),
        running: require('@/assets/characters/Penguin_Run.gif'),
      },
    ],
    background: require('@/assets/characters/Penguin_Background.png'),
  },
  {
    levels: [
      {
        front: require('@/assets/characters/PandaEgg.png'),
        running: require('@/assets/characters/PandaEgg_Run.gif'),
      },
      {
        front: require('@/assets/characters/Panda.png'),
        running: require('@/assets/characters/Panda_Run.gif'),
      },
    ],
    background: require('@/assets/characters/Panda_Background.png'),
  },
  {
    levels: [
      {
        front: require('@/assets/characters/ChickEgg.png'),
        running: require('@/assets/characters/ChickEgg_Run.gif'),
      },
      {
        front: require('@/assets/characters/Chick.png'),
        running: require('@/assets/characters/Chick_Run.gif'),
      },
    ],
    background: require('@/assets/characters/Chick_Background.png'),
  },
];

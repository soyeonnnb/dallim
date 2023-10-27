export type CharacterType = {
  character: any;
  background: any;
  gif: any
}

// 임시 저장된 캐릭터 인덱스
export const selectedPlanet = {
  index: 2
}

export const characterData: CharacterType[] = [
  {
    character: require('../../assets/characters/토끼_선택.png'),
    background: require('../../assets/characters/토끼_배경.png'),
    gif: require('../../assets/characters/펭귄_Running_1.gif')
  },
  {
    character: require('../../assets/characters/펭귄_선택.png'),
    background: require('../../assets/characters/펭귄_배경.png'),
    gif: require('../../assets/characters/펭귄_Running_1.gif')
  },
  {
    character: require('../../assets/characters/팬더_선택.png'),
    background: require('../../assets/characters/팬더_배경.png'),
    gif: require('../../assets/characters/펭귄_Running_1.gif')
  },
  {
    character: require('../../assets/characters/병아리_선택.png'),
    background: require('../../assets/characters/병아리_배경.png'),
    gif: require('../../assets/characters/펭귄_Running_1.gif')

  }
];

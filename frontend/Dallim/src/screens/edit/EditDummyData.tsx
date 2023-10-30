export interface Character {
  characterIndex: number;
  level: number;
  evolutionStage: number;
  exp: number;
  purchased: boolean;
}

export interface Planet {
  planetIndex: number;
  purchased: boolean;
}

export interface UserData {
  point: number;
  mainCharacterIndex: number;
  mainPlanetIndex: number;
  characters: Character[];
  planets: Planet[];
}

export interface UserResponse {
  status: string;
  data: UserData;
  message: string | null;
}

export const userDataDummy: UserResponse = {
  "status": "success",
  "data": {
    "point": 267192,
    "mainCharacterIndex": 0,
    "mainPlanetIndex": 3,
    "characters": [
      {
        "characterIndex": 0,
        "level": 10,
        "evolutionStage": 1,
        "exp": 0,
        "purchased": true
      },
      {
        "characterIndex": 1,
        "level": 8,
        "evolutionStage": 1,
        "exp": 50,
        "purchased": true
      },
      {
        "characterIndex": 2,
        "level": 2,
        "evolutionStage": 1,
        "exp": 0,
        "purchased": true
      },
      {
        "characterIndex": 3,
        "level": -1,
        "evolutionStage": 0,
        "exp": -1,
        "purchased": false
      }
    ],
    "planets": [
      {
        "planetIndex": 0,
        "purchased": true
      },
      {
        "planetIndex": 1,
        "purchased": false
      },
      {
        "planetIndex": 2,
        "purchased": true
      },
      {
        "planetIndex": 3,
        "purchased": false
      },
      {
        "planetIndex": 4,
        "purchased": true
      },
    ]
  },
  "message": null
};

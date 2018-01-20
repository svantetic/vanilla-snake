import { GameConfig } from './GameConfig.interface';

export enum Direction {
  LEFT = 'left',
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down'
}
export const gameConfig: GameConfig = {
  randomDotsColor: 'red',
  backgroundColor: 'black',
  snakeColor: 'white',
  snakeBodySize: 10,
  snakeLength: 10,
  snakeDirection: Direction.RIGHT,
  fps: 15
}


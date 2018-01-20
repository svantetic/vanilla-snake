import { BaseCanvas } from './BaseCanvas';
import { GameConfig } from '../config/GameConfig.interface';
import { gameConfig } from '../config/gameConfig';
import { Snake } from '../objects/Snake';

export class GameCanvas extends BaseCanvas {
  dotsOnField: Array<any>;
  backgroundColor: string;
  constructor(selector: string, config: GameConfig = gameConfig) {
    super(selector);
    this.dotsOnField = [];
    this.backgroundColor = config.backgroundColor;
  }

  init(snake: Snake) {
    this.clear();
    snake.initEventListeners();
  }

  clear() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }


}
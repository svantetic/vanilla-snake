import { BaseCanvas } from "./BaseCanvas";
import { GameConfig } from "../config/GameConfig.interface";
import { gameConfig } from "../config/gameConfig";


export class PointCanvas extends BaseCanvas {
  randomDotPosition: any;
  randomDotsColor: string;
  backgroundColor: string;
  constructor(selector: string, config: GameConfig = gameConfig) {
    super(selector);
    this.randomDotPosition = {};
    this.randomDotsColor = config.randomDotsColor;
    this.backgroundColor = config.backgroundColor;
  }

  generateNewRandomDot() {

    this.randomDotPosition.x = (Math.round(Math.random() * this.canvas.width / 10) * 10);
    this.randomDotPosition.y = (Math.round(Math.random() * this.canvas.height / 10) * 10);
    this.ctx.fillStyle = this.randomDotsColor;
    this.ctx.fillRect(this.randomDotPosition.x, this.randomDotPosition.y, 10, 10);

  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}
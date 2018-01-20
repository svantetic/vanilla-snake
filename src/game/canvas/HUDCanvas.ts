import { BaseCanvas } from "./BaseCanvas";

export class HUDCanvas extends BaseCanvas {
  gameWidth: number;
  gameHeight: number;
  fontWidthOffset: number;
  fontFamily: string;
  fontSize: string;
  score: number;
  constructor(selector: string, gameWidth: number, gameHeight: number) {
    super(selector);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.fontWidthOffset = -150;
    this.fontFamily = 'Helvetica';
    this.fontSize = '24px';
    this.score = 0;
  }

  init(hudText: string) {
    this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Score ${this.score}`, this.gameWidth + this.fontWidthOffset, 35);
  }

  incrementScore() {
    this.score++;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.ctx.fillText(`Score ${this.score}`, this.gameWidth + this.fontWidthOffset, 35);
  }

  setText(textToSet: string) {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.ctx.fillText(`${textToSet}`, this.gameWidth + this.fontWidthOffset, 35);
  }
}
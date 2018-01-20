import { GameConfig } from "../config/GameConfig.interface";
import { HUDCanvas } from "../canvas/HUDCanvas";
import { Direction, gameConfig } from "../config/gameConfig";
import { PointCanvas } from "../canvas/PointCanvas";
import { Block } from './Block';

export class Snake {
  body: Array<any>;
  config: GameConfig;
  alive: boolean;
  scorePointPosition: any;
  hudCanvas: HUDCanvas;
  direction: Direction;
  constructor(hudCanvas: HUDCanvas, config: GameConfig = gameConfig, direction: Direction = Direction.RIGHT) {
    this.body = [];
    this.config = config;
    this.direction = direction;
    this.alive = true;
    this.scorePointPosition = {};
    this.hudCanvas = hudCanvas;
  }


  initEventListeners() {
    var self = this;
    window.addEventListener("keypress", function (k) {
      let keyPressed = k.key;
      switch (keyPressed) {
        case 'a':
          self.changeDirection(Direction.LEFT);
          break;
        case 'w':
          self.changeDirection(Direction.UP);
          break;
        case 'd':
          self.changeDirection(Direction.RIGHT);
          break;
        case 's':
          self.changeDirection(Direction.DOWN);
          break;
      }
    }, false);
  }
  init() {
    for (let x = 0; x < this.config.snakeLength; x++) {
      this.body.push(new Block(50 + x * this.config.snakeBodySize, 50, this.config.snakeBodySize, this.config.snakeBodySize, this.config.snakeColor));
    }
  }
  getHeadPosition() {
    return {
      x: this.body[0].x,
      y: this.body[0].y
    }
  }
  changeDirection(newDirection: Direction) {
    if (this.canChangeDirection(this.direction, newDirection)) {
      this.direction = newDirection;
    }
  }

  canChangeDirection(oldDirection: Direction, newDirection: Direction) {
    return !(oldDirection === Direction.UP && newDirection === Direction.DOWN
      || oldDirection == Direction.DOWN && newDirection == Direction.UP
      || oldDirection == Direction.LEFT && newDirection == Direction.RIGHT
      || oldDirection == Direction.RIGHT && newDirection == Direction.LEFT);
  }
  move() {
    let self = this;
    self.body.shift();
    switch (this.direction) {
      case Direction.UP:
        self.body.push(new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y - 10, 10, 10, this.config.snakeColor));
        break;
      case Direction.LEFT:
        self.body.push(new Block(this.getLastBlockPosition().x - 10, this.getLastBlockPosition().y, 10, 10, this.config.snakeColor));
        break;
      case Direction.RIGHT:
        self.body.push(new Block(this.getLastBlockPosition().x + 10, this.getLastBlockPosition().y, 10, 10, this.config.snakeColor));
        break;
      case Direction.DOWN:
        self.body.push(new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y + 10, 10, 10, this.config.snakeColor));
        break;

    }
  }
  getLastBlockPosition(): { x: number, y: number } {
    return {
      x: this.body[this.body.length - 1].x,
      y: this.body[this.body.length - 1].y
    }
  }

  draw(canvasToDraw: any) {
    for (var blockNumber in this.body) {
      canvasToDraw.ctx.fillStyle = this.body[blockNumber].color;
      canvasToDraw.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y,
        this.body[blockNumber].width, this.body[blockNumber].height);
    }
  }

  isAlive() {
    return this.alive;
  }

  die() {
    this.alive = false;
    this.hudCanvas.setText("Game Over!");
  }

  checkIfInsideCanvas(canvasWidth: number, canvasHeight: number) {
    if (canvasWidth <= this.getLastBlockPosition().x ||
      canvasHeight <= this.getLastBlockPosition().y ||
      0 >= this.getLastBlockPosition().x ||
      0 >= this.getLastBlockPosition().y) {
      this.die();

    }
  }

  checkIfScored(pointCanvas: PointCanvas) {

    if (this.getLastBlockPosition().x == pointCanvas.randomDotPosition.x &&
      this.getLastBlockPosition().y == pointCanvas.randomDotPosition.y) {
      this.body.push(new Block(pointCanvas.randomDotPosition.x, pointCanvas.randomDotPosition.y, this.config.snakeBodySize, this.config.snakeBodySize, this.config.snakeColor));
      pointCanvas.clear();
      pointCanvas.generateNewRandomDot();
      this.hudCanvas.incrementScore();
    }
  }

  checkCollisionWithItself() {
    for (let i = 0; i < this.body.length - 1; i++)
      if (this.getLastBlockPosition().x == this.body[i].x && this.getLastBlockPosition().y == this.body[i].y) {
        this.die();
        return;
      }

  }

}
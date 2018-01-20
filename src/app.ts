import { GameConfig } from './game/config/GameConfig.interface';
import { gameConfig, Direction } from './game/config/gameConfig';
import { GameCanvas } from './game/canvas/GameCanvas';
import { PointCanvas } from './game/canvas/PointCanvas';
import { HUDCanvas } from './game/canvas/HUDCanvas';
import { Snake } from './game/objects/Snake';

class MainGame {
	gameOver: boolean;
	gameCanvas: GameCanvas = new GameCanvas('#game-canvas');
	pointCanvas: PointCanvas = new PointCanvas('#point-canvas');
	hudCanvas: HUDCanvas = new HUDCanvas('#hud-canvas', this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);
	snake: Snake = new Snake(this.hudCanvas);
	constructor() {
		this.gameOver = false;
		this.initGameObjects();
	}

	initGameObjects() {

		this.hudCanvas.init('Score');
		this.gameCanvas.init(this.snake);
		this.snake.init();
		this.pointCanvas.generateNewRandomDot();
		this.draw();
	}
	draw() {
		setTimeout(() => {
			if (!this.gameOver) {
				window.requestAnimationFrame(() => {
					this.draw()
				});
				this.gameCanvas.clear();
				this.snake.move();
				this.snake.checkCollisionWithItself();
				this.snake.checkIfScored(this.pointCanvas);
				this.snake.checkIfInsideCanvas(this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);
				this.snake.draw(this.gameCanvas);
				this.gameOver = !this.snake.isAlive();
			}
		}, 1000 / gameConfig.fps);
	}
};

const game = new MainGame();
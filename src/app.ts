import { GameConfig } from './game/config/GameConfig.interface';
import { gameConfig, Direction } from './game/config/gameConfig';
import { GameCanvas } from './game/canvas/GameCanvas';
import { PointCanvas } from './game/canvas/PointCanvas';
import { HUDCanvas } from './game/canvas/HUDCanvas';
import { Snake } from './game/objects/Snake';

const gameCanvas: GameCanvas = new GameCanvas('#game-canvas');
const pointCanvas: PointCanvas = new PointCanvas('#point-canvas');
const hudCanvas: HUDCanvas = new HUDCanvas('#hud-canvas', gameCanvas.canvas.width, gameCanvas.canvas.height);
const snake: Snake = new Snake(hudCanvas);

hudCanvas.init('Score');
gameCanvas.init(snake);
snake.init();

pointCanvas.generateNewRandomDot();

let gameOver: boolean = false;
function draw() {
    setTimeout(function() {
    	if (!gameOver) {
				requestAnimationFrame(draw);
				gameCanvas.clear();
				snake.move();
				snake.checkCollisionWithItself();
				snake.checkIfScored(pointCanvas);
				snake.checkIfInsideCanvas(gameCanvas.canvas.width, gameCanvas.canvas.height);
				snake.draw(gameCanvas);
				gameOver = !snake.isAlive();
		}
    }, 1000 / gameConfig.fps);
   }
draw();

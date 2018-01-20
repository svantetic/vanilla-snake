interface GameConfig {
	randomDotsColor: string;
	backgroundColor: string;
	snakeColor: string;
	snakeBodySize: number;
	snakeLength: number;
	snakeDirection: string;
	fps: number;
}
enum Direction {
	LEFT = 'left',
	UP = 'up',
	RIGHT = 'right',
	DOWN = 'down'
}
const gameConfig: GameConfig = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white',
	snakeBodySize: 10,
	snakeLength: 10,
	snakeDirection: Direction.RIGHT,
	fps: 15
}
class BaseCanvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	constructor(selector: string) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
	}
}

class HUDCanvas extends BaseCanvas {
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

class PointCanvas extends BaseCanvas {
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

class GameCanvas extends BaseCanvas{
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

class Block {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	constructor(x: number, y: number, width: number, height: number, color: string) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
}

class Snake {
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
		window.addEventListener("keypress", function(k) {
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

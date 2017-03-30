const config = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white',
	snakeLength: 6,
	snakeDirection: 'right',
	fps: 15
};

class BaseCanvas {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
	}
}

class HUDCanvas extends BaseCanvas {
	constructor(selector, gameWidth, gameHeight) {
		super(selector);
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.fontWidthOffset = -150;
		this.fontFamily = 'Helvetica';
		this.fontSize = '24px';
		this.score = 0;
	}

	init(hudText) {
		this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(`Score ${this.score}`, this.gameWidth + this.fontWidthOffset, 35);
	}

	incrementScore() {
		this.score++;
		this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
		this.ctx.fillText(`Score ${this.score}`, this.gameWidth + this.fontWidthOffset, 35);
	}

	setText(textToSet) {
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillText(`${textToSet}`, this.gameWidth + this.fontWidthOffset, 35);
	}
}

class PointCanvas extends BaseCanvas {
	constructor(selector) {
		super(selector);
		this.randomDotPosition = {};
		this.randomDotsColor = config.randomDotsColor;
		this.backgroundColor = 'rgba(0,0,0,0)';
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
	constructor(selector) {
		super(selector);
		this.dotsOnField = [];
		this.backgroundColor = config.backgroundColor;
	}

	init(snake) {
		this.clear();
		snake.initEventListeners();
	}
	
	clear() {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	
}

class Block {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
}

class Snake {
	constructor(hudCanvas) {
		this.body = [];
		this.bodyColor = config.snakeColor;
		this.blocksNumber = config.snakeLength;
		this.direction = config.snakeDirection;
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
					self.changeDirection('left');
					break;
				case 'w':
					self.changeDirection('up');
					break;
				case 'd':
					self.changeDirection('right');
					break;
				case 's':
					self.changeDirection('down');
					break;
			}
		}, false);
	}
	init() {
		for (let x = 0; x < this.blocksNumber; x++) {
			this.body.push(new Block(50 + x * 10, 50, 10, 10, this.bodyColor));
		}
	}
	getHeadPosition() {
		return {
			x: this.body[0].x,
			y: this.body[0].y
		}
	}
	changeDirection(newDirection) {
		if (this.canChangeDirection(this.direction, newDirection)) {
				this.direction = newDirection;
		}
	}

	canChangeDirection(oldDirection, newDirection) {
		return !(oldDirection === 'up' && newDirection === 'down'
			|| oldDirection == 'down' && newDirection == 'up'
			|| oldDirection == 'left' && newDirection == 'right'
			|| oldDirection == 'right' && newDirection == 'left');
	}
	move() {
		let self = this;
		self.body.shift();
		switch (this.direction) {
			case 'up':
			self.body.push(new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y - 10, 10, 10, this.bodyColor));
				break;
			case 'left':
			self.body.push(new Block(this.getLastBlockPosition().x - 10, this.getLastBlockPosition().y, 10, 10, this.bodyColor));
				break;
			case 'right':
			self.body.push(new Block(this.getLastBlockPosition().x + 10, this.getLastBlockPosition().y, 10, 10, this.bodyColor));
				break;
			case 'down':
			self.body.push(new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y + 10, 10, 10, this.bodyColor));
				break;
			
		}
	}
	getLastBlockPosition() {
		return {
					x: this.body[this.body.length - 1].x,
					y: this.body[this.body.length - 1].y
				}
		}

	draw(canvasToDraw) {
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

	checkIfInsideCanvas(canvasWidth, canvasHeight) {
		if (canvasWidth <= this.getLastBlockPosition().x ||
			canvasHeight <= this.getLastBlockPosition().y ||
			0 >= this.getLastBlockPosition().x ||
			0 >= this.getLastBlockPosition().y) {
			this.die();
			
		}
	}

	checkIfScored(pointCanvas) {

		if (this.getLastBlockPosition().x == pointCanvas.randomDotPosition.x &&
			this.getLastBlockPosition().y == pointCanvas.randomDotPosition.y) {
			this.body.push(new Block(pointCanvas.randomDotPosition.x, pointCanvas.randomDotPosition.y, this.bodyColor));
			pointCanvas.clear();
			pointCanvas.generateNewRandomDot();
			this.hudCanvas.incrementScore();
		}
	}

	checkCollisionWithItself() {
		let self = this;
		for (let i = 0; i < this.body.length - 1; i++)
			if (self.getLastBlockPosition().x == this.body[i].x && self.getLastBlockPosition().y == this.body[i].y) {
				self.die();
				return;
			}
		
	}

}
const gameCanvas = new GameCanvas('#game-canvas');
const pointCanvas = new PointCanvas('#point-canvas');
const hudCanvas = new HUDCanvas('#hud-canvas', gameCanvas.canvas.width, gameCanvas.canvas.height);
const snake = new Snake(hudCanvas);

hudCanvas.init('Score');
gameCanvas.init(snake);
snake.init();

pointCanvas.generateNewRandomDot();

let gameOver = false;
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
    }, 1000 / config.fps);
   }
draw();

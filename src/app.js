const config = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white',
	snakeLength: 6,
	snakeDirection: 'right',
	fps: 15
};
class Canvas {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
		this.dotsOnField = [];
		this.randomDotPosition = {};
		this.randomDotsColor = config.randomDotsColor;
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

	randomizeField() {
		this.randomDotPosition.x = Math.floor(Math.random() * this.canvas.width);
		this.randomDotPosition.y = Math.floor(Math.random() * this.canvas.height);
		this.ctx.fillStyle = this.randomDotsColor;
		this.ctx.fillRect(this.randomDotPosition.x, this.randomDotPosition.y, 10, 10);
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
	constructor() {
		this.body = [];
		this.bodyColor = config.snakeColor;
		this.blocksNumber = config.snakeLength;
		this.direction = config.snakeDirection;
		this.alive = true;
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
		console.log('old direction ' + this.direction + ' new direction ' + newDirection);
		if (this.canChangeDirection(this.direction, newDirection)) {
				this.direction = newDirection;
		}
	}

	canChangeDirection(oldDirection, newDirection) {
		return !(oldDirection == 'up' && newDirection == 'down'
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

	draw() {
		for (var blockNumber in this.body) {
			canvas.ctx.fillStyle = this.body[blockNumber].color;
			canvas.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y,
				this.body[blockNumber].width, this.body[blockNumber].height);
			}
		}

	isAlive() {
		return this.alive;
	}

	die() {
		this.alive = false;
	}

}
const canvas = new Canvas('#canvas');

const snake = new Snake();
canvas.init(snake);
snake.init();

canvas.randomizeField();

function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
			canvas.clear();
			snake.move();
			snake.draw();
    }, 1000 / config.fps);
}

draw();
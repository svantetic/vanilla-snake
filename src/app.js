const config = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white',
	snakeLength: 3
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
	}

	initEventListeners() {
		var self = this;
		window.addEventListener("keypress", function(k) {
			let keyPressed = k.key;
			switch (keyPressed) {
				case 'a': 
					self.changeDirection('left');
				case 'w':
					self.changeDirection('up');
				case 'd':
					self.changeDirection('left');
				case 's':
					self.changeDirection('down');
			}
		}, false);
	}
	init() {
		for (let x = 0; x < this.blocksNumber; x++) {
			this.body.push(new Block(50+x*10, 50, 10, 10, this.bodyColor));
		}
	}
	getHeadPosition() {
		return {
			x: this.body[0].x,
			y: this.body[0].y
		}
	}
	moveRight() {
		this.body.shift();
		this.body.push(
			new Block(this.getLastBlockPosition().x+10, this.getLastBlockPosition().y, 10, 10, this.bodyColor));
	}

	moveDown() {
		this.body.shift();
		this.body.push(
			new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y + 10, 10, 10, this.bodyColor));
	}

	moveUp() {
		this.body.shift();
		this.body.push(new Block(this.getLastBlockPosition().x, this.getLastBlockPosition().y - 10, 10, 10, this.bodyColor));
	}

	moveLeft() {
		this.body.shift();
		this.body.push(new Block(this.getLastBlockPosition().x - 10, this.getLastBlockPosition().y, 10, 10, this.bodyColor));
	}
	getLastBlockPosition() {
		return {
					x: this.body[this.body.length-1].x,
					y: this.body[this.body.length-1].y
				}
		}

	draw() {
		for (var blockNumber in this.body) {
			canvas.ctx.fillStyle = this.body[blockNumber].color;
			canvas.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y,
				this.body[blockNumber].width, this.body[blockNumber].height);
			}
		}
	}
const canvas = new Canvas('#canvas');

const snake = new Snake();
canvas.init(snake);
snake.init();

canvas.randomizeField();

const fps = 15;
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
			canvas.clear();
			snake.draw();
    }, 1000 / fps);
}

draw();
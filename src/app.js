var config = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white'
};

function Canvas(selector) {
	this.canvas = document.querySelector(selector);
	this.ctx = this.canvas.getContext('2d');
	this.dotsOnField = [];
	this.randomDotPosition = {};
	this.randomDotsColor = config.randomDotsColor;
	this.backgroundColor = config.backgroundColor;
	this.init = function() {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	this.clear = function() {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	this.randomizeField = function(dotsToGenerate) {
		this.randomDotPosition.x = Math.floor(Math.random() * this.canvas.width);
		this.randomDotPosition.y = Math.floor(Math.random() * this.canvas.height);
		this.ctx.fillStyle = this.randomDotsColor;
		this.ctx.fillRect(this.randomDotPosition.x, this.randomDotPosition.y, 10, 10);
	
	}

}

function Block(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

function Snake(blocksNumber) {
	this.body = [];
	this.bodyColor = config.snakeColor;
	this.blocksNumber = blocksNumber;
	this.init = function() {
		for (let x = 0; x < this.blocksNumber; x++) {
			this.body.push(new Block(50+x*10, 50, 10, 10, this.bodyColor));
		}
	}


	this.moveRight = function() {
		this.body.shift();
		console.log(this.body);
		this.body.push(
			new Block(this.getLastBlockPosition().x+10, this.getLastBlockPosition().y, 10, 10, 'rgb(255,255,255)'));
	}

	this.getLastBlockPosition = function() {
		return {
			x: this.body[this.body.length-1].x,
			y: this.body[this.body.length-1].y
		}
	}

	this.draw = function() {
		for (var blockNumber in this.body) {
			// console.log('im drawing');
			// console.log(this.body[blockNumber]);
			canvas.ctx.fillStyle = this.body[blockNumber].color;
			canvas.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y,
				this.body[blockNumber].width, this.body[blockNumber].height);
		}
	}
}
const canvas = new Canvas('#canvas');
canvas.init();
const snake = new Snake(15);
snake.init();
console.log(snake.body);
canvas.randomizeField(10);
// window.setInterval(function() {
// 	snake.moveRight();
// 	canvas.clear();
// 	snake.draw();

// }, 500);
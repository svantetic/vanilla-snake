function Canvas(selector, rgbColor) {
	this.canvas = document.querySelector(selector);
	this.ctx = this.canvas.getContext('2d');
	this.dotsOnField = [];
	this.randomDotsColor = 'red';
	this.rgbColor = rgbColor;
	this.init = function() {
		this.ctx.fillStyle = this.rgbColor;
		this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
	}

	this.clear = function() {
		this.ctx.fillStyle = this.rgbColor;
		this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
	}

	this.randomizeField = function(dotsToGenerate) {
		
			this.ctx.fillStyle = this.randomDotsColor;
			this.ctx.fillRect(Math.floor(Math.random() * this.canvas.width), Math.floor(Math.random() * this.canvas.height), 10, 10);
		
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
	this.blocksNumber = blocksNumber;
	this.init = function() {
		for (let x = 0; x < this.blocksNumber; x++) {
			this.body.push(new Block(50+x*10, 50, 10, 10, 'rgb(255,255,255)'));
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
const canvas = new Canvas('#canvas', 'rgb(0, 0, 0)');
canvas.init();
const snake = new Snake(15);
snake.init();
console.log(snake.body);
canvas.randomizeField(10);
window.setInterval(function() {
	snake.moveRight();
	canvas.clear();
	snake.draw();

}, 500);
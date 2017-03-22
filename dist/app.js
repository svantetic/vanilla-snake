'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = {
	randomDotsColor: 'red',
	backgroundColor: 'black',
	snakeColor: 'white',
	snakeLength: 6,
	snakeDirection: 'right',
	fps: 15
};

var BaseCanvas = function BaseCanvas(selector) {
	_classCallCheck(this, BaseCanvas);

	this.canvas = document.querySelector(selector);
	this.ctx = this.canvas.getContext('2d');
};

var HUDCanvas = function (_BaseCanvas) {
	_inherits(HUDCanvas, _BaseCanvas);

	function HUDCanvas(selector, gameWidth, gameHeight) {
		_classCallCheck(this, HUDCanvas);

		var _this = _possibleConstructorReturn(this, (HUDCanvas.__proto__ || Object.getPrototypeOf(HUDCanvas)).call(this, selector));

		_this.gameWidth = gameWidth;
		_this.gameHeight = gameHeight;
		_this.fontFamily = 'Helvetica';
		_this.fontSize = '24px';
		_this.score = 0;
		return _this;
	}

	_createClass(HUDCanvas, [{
		key: 'init',
		value: function init(hudText) {
			this.ctx.font = this.fontSize + ' ' + this.fontFamily;
			this.ctx.fillStyle = 'white';
			this.ctx.fillText('Score ' + this.score, this.gameWidth - 120, 35);
		}
	}, {
		key: 'incrementScore',
		value: function incrementScore() {
			this.score++;
			this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
			this.ctx.fillText('Score ' + this.score, this.gameWidth - 120, 35);
		}
	}]);

	return HUDCanvas;
}(BaseCanvas);

var PointCanvas = function (_BaseCanvas2) {
	_inherits(PointCanvas, _BaseCanvas2);

	function PointCanvas(selector) {
		_classCallCheck(this, PointCanvas);

		var _this2 = _possibleConstructorReturn(this, (PointCanvas.__proto__ || Object.getPrototypeOf(PointCanvas)).call(this, selector));

		_this2.randomDotPosition = {};
		_this2.randomDotsColor = config.randomDotsColor;
		_this2.backgroundColor = 'rgba(0,0,0,0)';
		return _this2;
	}

	_createClass(PointCanvas, [{
		key: 'generateNewRandomDot',
		value: function generateNewRandomDot() {

			this.randomDotPosition.x = Math.round(Math.random() * this.canvas.width / 10) * 10;
			this.randomDotPosition.y = Math.round(Math.random() * this.canvas.height / 10) * 10;
			this.ctx.fillStyle = this.randomDotsColor;
			this.ctx.fillRect(this.randomDotPosition.x, this.randomDotPosition.y, 10, 10);
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}]);

	return PointCanvas;
}(BaseCanvas);

var GameCanvas = function (_BaseCanvas3) {
	_inherits(GameCanvas, _BaseCanvas3);

	function GameCanvas(selector) {
		_classCallCheck(this, GameCanvas);

		var _this3 = _possibleConstructorReturn(this, (GameCanvas.__proto__ || Object.getPrototypeOf(GameCanvas)).call(this, selector));

		_this3.dotsOnField = [];
		_this3.backgroundColor = config.backgroundColor;
		return _this3;
	}

	_createClass(GameCanvas, [{
		key: 'init',
		value: function init(snake) {
			this.clear();
			snake.initEventListeners();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}]);

	return GameCanvas;
}(BaseCanvas);

var Block = function Block(x, y, width, height, color) {
	_classCallCheck(this, Block);

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
};

var Snake = function () {
	function Snake(hudCanvas) {
		_classCallCheck(this, Snake);

		this.body = [];
		this.bodyColor = config.snakeColor;
		this.blocksNumber = config.snakeLength;
		this.direction = config.snakeDirection;
		this.alive = true;
		this.scorePointPosition = {};
		this.hudCanvas = hudCanvas;
	}

	_createClass(Snake, [{
		key: 'initEventListeners',
		value: function initEventListeners() {
			var self = this;
			window.addEventListener("keypress", function (k) {
				var keyPressed = k.key;
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
	}, {
		key: 'init',
		value: function init() {
			for (var x = 0; x < this.blocksNumber; x++) {
				this.body.push(new Block(50 + x * 10, 50, 10, 10, this.bodyColor));
			}
		}
	}, {
		key: 'getHeadPosition',
		value: function getHeadPosition() {
			return {
				x: this.body[0].x,
				y: this.body[0].y
			};
		}
	}, {
		key: 'changeDirection',
		value: function changeDirection(newDirection) {
			if (this.canChangeDirection(this.direction, newDirection)) {
				this.direction = newDirection;
			}
		}
	}, {
		key: 'canChangeDirection',
		value: function canChangeDirection(oldDirection, newDirection) {
			return !(oldDirection == 'up' && newDirection == 'down' || oldDirection == 'down' && newDirection == 'up' || oldDirection == 'left' && newDirection == 'right' || oldDirection == 'right' && newDirection == 'left');
		}
	}, {
		key: 'move',
		value: function move() {
			var self = this;
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
	}, {
		key: 'getLastBlockPosition',
		value: function getLastBlockPosition() {
			return {
				x: this.body[this.body.length - 1].x,
				y: this.body[this.body.length - 1].y
			};
		}
	}, {
		key: 'draw',
		value: function draw(canvasToDraw) {
			for (var blockNumber in this.body) {
				canvasToDraw.ctx.fillStyle = this.body[blockNumber].color;
				canvasToDraw.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y, this.body[blockNumber].width, this.body[blockNumber].height);
			}
		}
	}, {
		key: 'isAlive',
		value: function isAlive() {
			return this.alive;
		}
	}, {
		key: 'die',
		value: function die() {
			this.alive = false;
		}
	}, {
		key: 'checkIfInsideCanvas',
		value: function checkIfInsideCanvas(canvasWidth, canvasHeight) {
			if (canvasWidth <= this.getLastBlockPosition().x || canvasHeight <= this.getLastBlockPosition().y || 0 >= this.getLastBlockPosition().x || 0 >= this.getLastBlockPosition().y) {
				this.die();
			}
		}
	}, {
		key: 'checkIfScored',
		value: function checkIfScored(pointCanvas) {

			if (this.getLastBlockPosition().x == pointCanvas.randomDotPosition.x && this.getLastBlockPosition().y == pointCanvas.randomDotPosition.y) {
				this.body.push(new Block(pointCanvas.randomDotPosition.x, pointCanvas.randomDotPosition.y, this.bodyColor));
				pointCanvas.clear();
				pointCanvas.generateNewRandomDot();
				this.hudCanvas.incrementScore();
			}
		}
	}, {
		key: 'checkCollisionWithItself',
		value: function checkCollisionWithItself() {
			var self = this;
			for (var i = 0; i < this.body.length - 1; i++) {
				if (self.getLastBlockPosition().x == this.body[i].x && self.getLastBlockPosition().y == this.body[i].y) {
					self.die();
					return;
				}
			}
		}
	}]);

	return Snake;
}();

var gameCanvas = new GameCanvas('#game-canvas');
var pointCanvas = new PointCanvas('#point-canvas');
var hudCanvas = new HUDCanvas('#hud-canvas', gameCanvas.canvas.width, gameCanvas.canvas.height);
var snake = new Snake(hudCanvas);

hudCanvas.init('Score');
gameCanvas.init(snake);
snake.init();

pointCanvas.generateNewRandomDot();

var gameOver = false;
function draw() {
	setTimeout(function () {
		if (!gameOver) {
			requestAnimationFrame(draw);
			gameCanvas.clear();
			snake.move();
			snake.draw(gameCanvas);
			snake.checkCollisionWithItself();
			snake.checkIfScored(pointCanvas);
			snake.checkIfInsideCanvas(gameCanvas.canvas.width, gameCanvas.canvas.height);
			gameOver = !snake.isAlive();
		}
	}, 1000 / config.fps);
}
draw();
//# sourceMappingURL=app.js.map

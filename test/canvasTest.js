var assert = chai.assert;
var expect = chai.expect;

describe("BaseCanvas", function() {
	it('should have canvas and context property', function() {
		let baseCanvas = new BaseCanvas('#game-canvas');
		assert.isDefined(baseCanvas.canvas, 'BaseCanvas does not have canvas');
		assert.isDefined(baseCanvas.ctx, 'BaseCanvas does not have ctx');
	});
})
describe("Canvas", function() {
	before(function() {
		gameOver = true;
	})
	it('should be object', function() {
		
		assert(typeof gameCanvas == 'object', 'canvas is not an object!');
	});

	it('should be Canvas object', function() {
		assert.instanceOf(gameCanvas, GameCanvas, 'canvas is not instance of Canvas');
	})

	it('should extend BaseCanvas class', function() {
		assert.instanceOf(gameCanvas, BaseCanvas, 'gameCanvas is not extending BaseCanvas');
	})
	it('should have id canvas', function() {
		assert(gameCanvas.canvas.id == 'game-canvas', 'canvas is not of id canvas!');
	});

	it('should have 2d context', function() {
		assert(pointCanvas.ctx.__proto__.toString() == "[object CanvasRenderingContext2D]", 'context does not render in 2D context mode');
	});

	it('should have random dots of color red', function() {
		assert(pointCanvas.randomDotsColor == 'red', 'canvas has ' + pointCanvas.randomDotsColor + ' dots');
	})


	it('should generate and return random dot in canvas \' bounds', function() {
		assert.isAtLeast(pointCanvas.randomDotPosition.x, 0, 'does not have proper x value');
		assert.isAtLeast(pointCanvas.randomDotPosition.y, 0, 'doest not have proper y value');
	});
	it('should have black background', function() {
		assert.isDefined(gameCanvas.backgroundColor, 'canvas has undefined backgroundColor property');
		assert(gameCanvas.backgroundColor == 'black', 'canvas has ' + gameCanvas.backgroundColor + ' backgroundColor');
	});
	it('should have config file with proper config fields', function() {
		assert(config.hasOwnProperty('snakeColor'), 'config does not have snake color property');
		assert(config.hasOwnProperty('backgroundColor'), 'config does not have backgroundColor property');
		assert(config.hasOwnProperty('randomDotsColor'), 'config does not have randomDotsColor property');
		
	})
})
describe('HUDCanvas', function() {
	it('should extend BaseCanvas', function() {
		
	})
})
describe('Snake', function() {
	it('should have config element for snake length larger than 1', function() {
		expect(config).to.have.property('snakeLength').and.to.be.above(2);
		assert.equal(config.snakeLength, snake.blocksNumber, 'these two are not equal');
		// assert.isAtLeast(config.snakeLength, 2, 'snake length is lower than two');
	});
	it('should have not null body', function() {
		assert.isDefined(snake.body,'body undefined');
	});
	it('should be derived from Snake class', function() {
		assert.instanceOf(snake, Snake, 'snake is not instance of snake!');
	});

	it('should have direction property and changeDirection() function', function() {
		assert.isDefined(snake.direction, 'snake does not have direction property');
		assert.isFunction(snake.changeDirection, 'snake does not have change Direction method');
	});

	it('should have move() function', function() {
		assert.isFunction(snake.move, 'snake does not have move method');
	});

	it('should have checkHeadPosition and checkHeadPosition should return snake\'s head position', function(){
		assert.isDefined(snake.getHeadPosition(), 'x', 'function does not return x position');
		assert.isDefined(snake.getHeadPosition(), 'y', 'function does not return x position');
		assert.isAtLeast(snake.getHeadPosition().x, 0, 'function does return x < 0 value');
		assert.isAtLeast(snake.getHeadPosition().y, 0, 'function does return y < 0 value');
	});

	it('should have initEventListeners method', function() {
		assert.isFunction(snake.initEventListeners, "snake does not have event initializer method");
	});

	it('should have working changeDirection method', function() {
		assert.isFalse(snake.canChangeDirection('left', 'right'), 'snake can change direction from left to right');
		assert.isFalse(snake.canChangeDirection('right', 'left'), 'snake can change direction from right to left');
		assert.isFalse(snake.canChangeDirection('down', 'up'), 'snake can change direction from down to up');
		assert.isFalse(snake.canChangeDirection('up', 'down'), 'snake can change direction from up to down');

	});

	it('should have alive property, is alive method and die() method', function() {
		assert.isDefined(snake.alive, 'snake does not have alive method');
		assert.isFunction(snake.isAlive, 'snake does not have isAlive method');
		assert.isFunction(snake.die, 'snake does not have die method');
	})
});


describe('Block' ,function() {
	it('should be derived from Block class', function() {
		var testBlock = new Block();
		assert.instanceOf(testBlock, Block, 'block is not instance of Block!');
	})
})


describe('HUD Canvas', function() {
	it('should increment score', function() {
		let hudCanvas = new HUDCanvas("#hud-canvas", 300, 300);
		let initialScore = hudCanvas.score;
		hudCanvas.incrementScore();
		assert.equal(initialScore + 1, hudCanvas.score, "it does not increment score");
	});
	it('should have 0 score at the beginning', function(){
		let hudCanvas = new HUDCanvas("#hud-canvas", 300, 300);
		assert.equal(hudCanvas.score, 0, "it does not have 0 score at the beginning");
	});
})
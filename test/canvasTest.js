var assert = chai.assert;
var expect = chai.expect;
describe("Canvas", function() {
	it('should be object', function() {
		
		assert(typeof canvas == 'object', 'canvas is not an object!');
	});

	it('should be Canvas object', function() {
		assert.instanceOf(canvas, Canvas, 'canvas is not instance of Canvas');
	})

	it('should have id canvas', function() {
		assert(canvas.canvas.id == 'canvas', 'canvas is not of id canvas!');
	});

	it('should have 2d context', function() {
		assert(canvas.ctx.__proto__.toString() == "[object CanvasRenderingContext2D]", 'context does not render in 2D context mode');
	});

	it('should have random dots of color red', function() {
		assert(canvas.randomDotsColor == 'red', 'canvas has ' + canvas.randomDotsColor + ' dots');
	})


	it('should generate and return random dot in canvas \' bounds', function() {
		assert.isAtLeast(canvas.randomDotPosition.x, 0, 'does not have proper x value');
		assert.isAtLeast(canvas.randomDotPosition.y, 0, 'doest not have proper y value');
	});
	it('should have black background', function() {
		assert.isDefined(canvas.backgroundColor, 'canvas has undefined backgroundColor property');
		assert(canvas.backgroundColor == 'black', 'canvas has ' + canvas.backgroundColor + ' backgroundColor');
	});
	it('should have config file with proper config fields', function() {
		assert(config.hasOwnProperty('snakeColor'), 'config does not have snake color property');
		assert(config.hasOwnProperty('backgroundColor'), 'config does not have backgroundColor property');
		assert(config.hasOwnProperty('randomDotsColor'), 'config does not have randomDotsColor property');
		
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

	it('should move right', function() {
		let lastPosition = snake.getLastBlockPosition();
		snake.init();
		snake.draw();
		snake.moveRight();
		let secondOfLastBlockPosition = snake.body[snake.body.length - 2].x;
		assert.equal(lastPosition.x, secondOfLastBlockPosition, 'snake is not moving!');
	});
	it('should have moveDown function', function() {
		assert.isFunction(snake.moveDown, 'moveDown is not a function!');
	})
	it('should move down', function() {
		let lastPosition = snake.getLastBlockPosition();
		canvas.clear();
		snake.draw();
		canvas.clear();
		snake.moveDown();
		let newPosition = snake.getLastBlockPosition();
		assert(newPosition.x == lastPosition.x && newPosition.y == lastPosition.y + 10, 'snake is not moving down');
	});
it('should move up', function() {
		let lastPosition = snake.getLastBlockPosition();
		canvas.clear();
		snake.draw();
		canvas.clear();
		snake.moveUp();
		let newPosition = snake.getLastBlockPosition();
		assert(newPosition.x == lastPosition.x && newPosition.y == lastPosition.y - 10, 'snake is not moving up');
	});it('should move left', function() {
		let lastPosition = snake.getLastBlockPosition();
		canvas.clear();
		snake.draw();
		canvas.clear();
		snake.moveLeft();
		let newPosition = snake.getLastBlockPosition();
		assert(newPosition.x == lastPosition.x - 10 && newPosition.y == lastPosition.y, 'snake is not moving down');
	});
	it('should have checkHeadPosition and checkHeadPosition should return snake\'s head position', function(){
		assert.isDefined(snake.getHeadPosition(), 'x', 'function does not return x position');
		assert.isDefined(snake.getHeadPosition(), 'y', 'function does not return x position');
		assert.isAtLeast(snake.getHeadPosition().x, 0, 'function does return x < 0 value');
		assert.isAtLeast(snake.getHeadPosition().y, 0, 'function does return y < 0 value');


	})
})

describe('Block' ,function() {
	it('should be derived from Block class', function() {
		var testBlock = new Block();
		assert.instanceOf(testBlock, Block, 'block is not instance of Block!');
	})
})
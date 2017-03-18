var assert = chai.assert;
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
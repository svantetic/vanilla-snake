/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_config_gameConfig__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_canvas_GameCanvas__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_canvas_PointCanvas__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_canvas_HUDCanvas__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_objects_Snake__ = __webpack_require__(6);





var MainGame = /** @class */ (function () {
    function MainGame() {
        this.gameCanvas = new __WEBPACK_IMPORTED_MODULE_1__game_canvas_GameCanvas__["a" /* GameCanvas */]('#game-canvas');
        this.pointCanvas = new __WEBPACK_IMPORTED_MODULE_2__game_canvas_PointCanvas__["a" /* PointCanvas */]('#point-canvas');
        this.hudCanvas = new __WEBPACK_IMPORTED_MODULE_3__game_canvas_HUDCanvas__["a" /* HUDCanvas */]('#hud-canvas', this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);
        this.snake = new __WEBPACK_IMPORTED_MODULE_4__game_objects_Snake__["a" /* Snake */](this.hudCanvas);
        this.gameOver = false;
        this.initGameObjects();
    }
    MainGame.prototype.initGameObjects = function () {
        this.hudCanvas.init('Score');
        this.gameCanvas.init(this.snake);
        this.snake.init();
        this.pointCanvas.generateNewRandomDot();
        this.draw();
    };
    MainGame.prototype.draw = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.gameOver) {
                window.requestAnimationFrame(function () {
                    _this.draw();
                });
                _this.gameCanvas.clear();
                _this.snake.move();
                _this.snake.checkCollisionWithItself();
                _this.snake.checkIfScored(_this.pointCanvas);
                _this.snake.checkIfInsideCanvas(_this.gameCanvas.canvas.width, _this.gameCanvas.canvas.height);
                _this.snake.draw(_this.gameCanvas);
                _this.gameOver = !_this.snake.isAlive();
            }
        }, 1000 / __WEBPACK_IMPORTED_MODULE_0__game_config_gameConfig__["a" /* gameConfig */].fps);
    };
    return MainGame;
}());
;
var game = new MainGame();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gameConfig; });
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["UP"] = "up";
    Direction["RIGHT"] = "right";
    Direction["DOWN"] = "down";
})(Direction || (Direction = {}));
var gameConfig = {
    randomDotsColor: 'red',
    backgroundColor: 'black',
    snakeColor: 'white',
    snakeBodySize: 10,
    snakeLength: 10,
    snakeDirection: Direction.RIGHT,
    fps: 15
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseCanvas; });
var BaseCanvas = /** @class */ (function () {
    function BaseCanvas(selector) {
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext('2d');
    }
    return BaseCanvas;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCanvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_gameConfig__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameCanvas; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var GameCanvas = /** @class */ (function (_super) {
    __extends(GameCanvas, _super);
    function GameCanvas(selector, config) {
        if (config === void 0) { config = __WEBPACK_IMPORTED_MODULE_1__config_gameConfig__["a" /* gameConfig */]; }
        var _this = _super.call(this, selector) || this;
        _this.dotsOnField = [];
        _this.backgroundColor = config.backgroundColor;
        return _this;
    }
    GameCanvas.prototype.init = function (snake) {
        this.clear();
        snake.initEventListeners();
    };
    GameCanvas.prototype.clear = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return GameCanvas;
}(__WEBPACK_IMPORTED_MODULE_0__BaseCanvas__["a" /* BaseCanvas */]));



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCanvas__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HUDCanvas; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var HUDCanvas = /** @class */ (function (_super) {
    __extends(HUDCanvas, _super);
    function HUDCanvas(selector, gameWidth, gameHeight) {
        var _this = _super.call(this, selector) || this;
        _this.gameWidth = gameWidth;
        _this.gameHeight = gameHeight;
        _this.fontWidthOffset = -150;
        _this.fontFamily = 'Helvetica';
        _this.fontSize = '24px';
        _this.score = 0;
        return _this;
    }
    HUDCanvas.prototype.init = function (hudText) {
        this.ctx.font = this.fontSize + " " + this.fontFamily;
        this.ctx.fillStyle = 'white';
        this.ctx.fillText("Score " + this.score, this.gameWidth + this.fontWidthOffset, 35);
    };
    HUDCanvas.prototype.incrementScore = function () {
        this.score++;
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillText("Score " + this.score, this.gameWidth + this.fontWidthOffset, 35);
    };
    HUDCanvas.prototype.setText = function (textToSet) {
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.ctx.fillText("" + textToSet, this.gameWidth + this.fontWidthOffset, 35);
    };
    return HUDCanvas;
}(__WEBPACK_IMPORTED_MODULE_0__BaseCanvas__["a" /* BaseCanvas */]));



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseCanvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_gameConfig__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointCanvas; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PointCanvas = /** @class */ (function (_super) {
    __extends(PointCanvas, _super);
    function PointCanvas(selector, config) {
        if (config === void 0) { config = __WEBPACK_IMPORTED_MODULE_1__config_gameConfig__["a" /* gameConfig */]; }
        var _this = _super.call(this, selector) || this;
        _this.randomDotPosition = {};
        _this.randomDotsColor = config.randomDotsColor;
        _this.backgroundColor = config.backgroundColor;
        return _this;
    }
    PointCanvas.prototype.generateNewRandomDot = function () {
        this.randomDotPosition.x = (Math.round(Math.random() * this.canvas.width / 10) * 10);
        this.randomDotPosition.y = (Math.round(Math.random() * this.canvas.height / 10) * 10);
        this.ctx.fillStyle = this.randomDotsColor;
        this.ctx.fillRect(this.randomDotPosition.x, this.randomDotPosition.y, 10, 10);
    };
    PointCanvas.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return PointCanvas;
}(__WEBPACK_IMPORTED_MODULE_0__BaseCanvas__["a" /* BaseCanvas */]));



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Block__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Snake; });


var Snake = /** @class */ (function () {
    function Snake(hudCanvas, config, direction) {
        if (config === void 0) { config = __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["a" /* gameConfig */]; }
        if (direction === void 0) { direction = __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].RIGHT; }
        this.body = [];
        this.config = config;
        this.direction = direction;
        this.alive = true;
        this.scorePointPosition = {};
        this.hudCanvas = hudCanvas;
    }
    Snake.prototype.initEventListeners = function () {
        var self = this;
        window.addEventListener("keypress", function (k) {
            var keyPressed = k.key;
            switch (keyPressed) {
                case 'a':
                    self.changeDirection(__WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].LEFT);
                    break;
                case 'w':
                    self.changeDirection(__WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].UP);
                    break;
                case 'd':
                    self.changeDirection(__WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].RIGHT);
                    break;
                case 's':
                    self.changeDirection(__WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].DOWN);
                    break;
            }
        }, false);
    };
    Snake.prototype.init = function () {
        for (var x = 0; x < this.config.snakeLength; x++) {
            this.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](50 + x * this.config.snakeBodySize, 50, this.config.snakeBodySize, this.config.snakeBodySize, this.config.snakeColor));
        }
    };
    Snake.prototype.getHeadPosition = function () {
        return {
            x: this.body[0].x,
            y: this.body[0].y
        };
    };
    Snake.prototype.changeDirection = function (newDirection) {
        if (this.canChangeDirection(this.direction, newDirection)) {
            this.direction = newDirection;
        }
    };
    Snake.prototype.canChangeDirection = function (oldDirection, newDirection) {
        return !(oldDirection === __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].UP && newDirection === __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].DOWN
            || oldDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].DOWN && newDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].UP
            || oldDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].LEFT && newDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].RIGHT
            || oldDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].RIGHT && newDirection == __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].LEFT);
    };
    Snake.prototype.move = function () {
        var self = this;
        self.body.shift();
        switch (this.direction) {
            case __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].UP:
                self.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](this.getLastBlockPosition().x, this.getLastBlockPosition().y - 10, 10, 10, this.config.snakeColor));
                break;
            case __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].LEFT:
                self.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](this.getLastBlockPosition().x - 10, this.getLastBlockPosition().y, 10, 10, this.config.snakeColor));
                break;
            case __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].RIGHT:
                self.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](this.getLastBlockPosition().x + 10, this.getLastBlockPosition().y, 10, 10, this.config.snakeColor));
                break;
            case __WEBPACK_IMPORTED_MODULE_0__config_gameConfig__["b" /* Direction */].DOWN:
                self.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](this.getLastBlockPosition().x, this.getLastBlockPosition().y + 10, 10, 10, this.config.snakeColor));
                break;
        }
    };
    Snake.prototype.getLastBlockPosition = function () {
        return {
            x: this.body[this.body.length - 1].x,
            y: this.body[this.body.length - 1].y
        };
    };
    Snake.prototype.draw = function (canvasToDraw) {
        for (var blockNumber in this.body) {
            canvasToDraw.ctx.fillStyle = this.body[blockNumber].color;
            canvasToDraw.ctx.fillRect(this.body[blockNumber].x, this.body[blockNumber].y, this.body[blockNumber].width, this.body[blockNumber].height);
        }
    };
    Snake.prototype.isAlive = function () {
        return this.alive;
    };
    Snake.prototype.die = function () {
        this.alive = false;
        this.hudCanvas.setText("Game Over!");
    };
    Snake.prototype.checkIfInsideCanvas = function (canvasWidth, canvasHeight) {
        if (canvasWidth <= this.getLastBlockPosition().x ||
            canvasHeight <= this.getLastBlockPosition().y ||
            0 >= this.getLastBlockPosition().x ||
            0 >= this.getLastBlockPosition().y) {
            this.die();
        }
    };
    Snake.prototype.checkIfScored = function (pointCanvas) {
        if (this.getLastBlockPosition().x == pointCanvas.randomDotPosition.x &&
            this.getLastBlockPosition().y == pointCanvas.randomDotPosition.y) {
            this.body.push(new __WEBPACK_IMPORTED_MODULE_1__Block__["a" /* Block */](pointCanvas.randomDotPosition.x, pointCanvas.randomDotPosition.y, this.config.snakeBodySize, this.config.snakeBodySize, this.config.snakeColor));
            pointCanvas.clear();
            pointCanvas.generateNewRandomDot();
            this.hudCanvas.incrementScore();
        }
    };
    Snake.prototype.checkCollisionWithItself = function () {
        for (var i = 0; i < this.body.length - 1; i++)
            if (this.getLastBlockPosition().x == this.body[i].x && this.getLastBlockPosition().y == this.body[i].y) {
                this.die();
                return;
            }
    };
    return Snake;
}());



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Block; });
var Block = /** @class */ (function () {
    function Block(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    return Block;
}());



/***/ })
/******/ ]);
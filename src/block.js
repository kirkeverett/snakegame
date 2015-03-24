var Screen = require('./screen');

// A block represents one cell of the game grid
var Block = function (xPos, yPos, color) {
    'use strict';

    color = color || '#FFFF00';

    var block = {
        x: xPos,
        y: yPos,
        color:color,

        draw: function () {
            this.drawCell(this.x, this.y, color);
        },
        move: function (direction) {

            switch (direction) {
                case 'right':
                    this.x++;
                    break;
                case 'left':
                    this.x--;
                    break;
                case 'down':
                    this.y++;
                    break;
                case 'up':
                    this.y--;
                    break;
            }
        },
        samePosition: function (block) {
            return this.x === block.x && this.y === block.y;
        },
        withinBounds: function (minX, minY, maxX, maxY) {
            return (this.x >= minX && this.y >= minY && this.x < maxX && this.y < maxY);
        },
        isAtTopLeft: function() {
           return (this.onLeftWall() && this.onTopWall());
        },
        isAtLowerLeft: function() {
            return (this.onLeftWall() && this.onBottomWall());
        },
        isAtUpperRight : function() {
            return (this.onRightWall() && this.onTopWall());
        },
        isAtLowerRight : function() {
            return (this.onRightWall() && this.onBottomWall());
        },
        onLeftWall : function() {
            return (this.x === 0);
        },
        onRightWall : function() {
            var dim = getScreenGridDim();
            return (this.x === dim.numCols - 1);
        },
        onTopWall : function() {
            return (this.y === 0);
        },
        onBottomWall : function() {
            var dim = getScreenGridDim();
            return (this.y === dim.numRows - 1);
        }


    };

    // "extend" with the screen closure methods
    _.extend(block.constructor.prototype, Screen.getInstance());

    return block;

};

module.exports = Block;
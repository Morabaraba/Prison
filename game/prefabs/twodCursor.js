'use strict';

var TwodCursor = function(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.step = 200;
	this.cursors = this.game.input.keyboard.createCursorKeys();

	// initialize your prefab here
};

TwodCursor.prototype = Object.create(Phaser.Sprite.prototype);
TwodCursor.prototype.constructor = TwodCursor;

TwodCursor.prototype.update = function update() {
	if (this.cursors.left.isDown) {
		this.body.velocity.x = -this.step;
	} else if (this.cursors.right.isDown) {
		this.body.velocity.x = this.step;
	} else {
		this.body.velocity.x = 0;
	}
	if (this.cursors.up.isDown) {
		this.body.velocity.y = -this.step;
	} else if (this.cursors.down.isDown) {
		this.body.velocity.y = +this.step;
	} else {
		this.body.velocity.y = 0;
	}
};

module.exports = TwodCursor;

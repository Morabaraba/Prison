'use strict';

/** 
 * Extends Phaser.Sprite
 */
var TwodCursor = function(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.step = 200;
    this.maxSpeed = 400;
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	this.stick = this.game.world.pad.addStick(0, 0, 124, 'arcade-joystick');
	this.stick.showOnTouch = true;

	// initialize your prefab here
};

TwodCursor.prototype = Object.create(Phaser.Sprite.prototype);
TwodCursor.prototype.constructor = TwodCursor;

TwodCursor.prototype.destroy = function() {
	this.stick.enabled = false;
	this.stick.visible = false;
	//this.stick.destroy();
	//this.pad.destroy();
}

TwodCursor.prototype.update = function() {
	if (this.cursors.left.isDown || (this.stick.isDown && this.stick.x < 0)) {
		this.body.velocity.x = -this.step;
	} else if (this.cursors.right.isDown || (this.stick.isDown && this.stick.x > 0)) {
		this.body.velocity.x = this.step;
	} else {
		this.body.velocity.x = 0;
	}
	if (this.cursors.up.isDown || (this.stick.isDown && this.stick.y < 0)) {
		this.body.velocity.y = -this.step;
	} else if (this.cursors.down.isDown|| (this.stick.isDown && this.stick.y > 0)) {
		this.body.velocity.y = +this.step;
	} else {
		this.body.velocity.y = 0;
	}
}

module.exports = TwodCursor;

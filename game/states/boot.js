'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    //this.load.image('preloader', 'assets/preloader.gif');
		// Load our virtual joystick
    	this.game.load.script('joystick', 'assets/joystick/phaser-virtual-joystick.min.js');
    	this.game.load.atlas('arcade-joystick', 'assets/joystick/arcade-joystick.png', 'assets/joystick/arcade-joystick.json');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    
	  this.game.world.pad = this.game.plugins.add(Phaser.VirtualJoystick);
    this.game.state.start('preload');
  }
};

module.exports = Boot;

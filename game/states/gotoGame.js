'use strict';

function GotoGame() {}
GotoGame.prototype = {
	init: function(url, message) {
		//    this.game.state.start('preload');
		this.url = url;
		this.message = message;
	},
	preload: function() {
		// Override this method to add some load operations. 
		// If you need to use the loader, you may need to use them here.
	},
	create: function() {
		// This method is called after the game engine successfully switches states. 
		// Feel free to add any setup code here (do not load anything here, override preload() instead).
		window.location = this.url;

		this.messageText = this.game.add.text(48, 48, this.message, {
			font: '32px Arial',
			fill: '#ffffff',
			align: 'center'
		});
	},
	update: function() {
		// state update code
		if (this.game.input.activePointer.justPressed()) {
			window.location.reload(true);
		};
	},
	paused: function() {
		// This method will be called when game paused.
	},
	render: function() {
		// Put render operations here.
	},
	shutdown: function() {
		// This method will be called when the state is shut down 
		// (i.e. you switch to another state from this one).
	}
};
module.exports = GotoGame;

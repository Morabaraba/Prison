'use strict';
var _ = require('underscore');

/**
 * @class
 *
 * Welcome traveler or must I say tinkerer. You seek to travel lands full of
 * code, if you are willing to learn you will find it easy to navigate the
 * world from here.
 *
 * A basic understanding of javascript is needed I throw the [Javascript in 30 Minutes Youtube Video]
 * at you or send you of the [khan acadamy] for a
 * week and then you should be able to play in this sandbox.
 *
 * This is our play state Constructor
 * 
 * [Javascript in 30 Minutes Youtube Video]: https://www.youtube.com/watch?v=_cLvpJY2deo
 * [khan acadamy]: https://www.khanacademy.org/computing/computer-programming/programming
 */
function Level1() {};
Level1.prototype = {
	/**
	 * Init our level
	 * 
	 * @memberof Level1.prototype 
	 */
	init: function(config) {
		config = config || {};
		this.config = config;
		this.map = 'map';
		if (config.map) {
			this.map = config.map;
		}
	},
	/**
	 * The preload state function of the play state.
	 * Load assets that was not in our map.properties.assets json file you will
	 * need for you game.
	 * 
	 * @memberof Level1.prototype 
	 */
	preload: function() {
		// all your preloads, asset kind of stuff.
	},

	/**
	 * The create state
	 * 
	 * @memberof Level1.prototype 
	 */
	create: function() {
		// we enable arcade physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		/**
		 * @prop this.map TwodMap the map prefab instance attached to the Level1 state
		 *
		 * By default it loads the Tiled json map from the 'map' key in phaser.cache that was
		 * loaded by the Preload state.
		 */
		var TwodMap = require('../prefabs/twodMap');
		this.mapKey = this.map;
		this.map = new TwodMap(this.game, this.map);
		// TODO remove global after you debugged
		window.map = this.map;

		// this creates our layers and them to the game.world group.
		this.layers = map.createLayers();
		// this creates the objects as phaser sprites, and if a player object is found 
		// create a map.player property which uses the twodCursor prefab.
		this.sprites = map.createObjects();
		
		this.introText = this.map.createText(48, 48, 'Quick let me turn you into a rat, hide the goods, and scram through the gutter', { font: '16px Arial', fill: '#ffffff', align: 'center'});
		this.introText.wordWrap = true;
		this.map.player.loadTexture('orange_rat');
	},

	/**
	 * The update state
	 *
	 * This is our play area grap the [phaser class docs] and start to manipulate the game
	 * Also look at the [phaser examples] this file heavily correlates with their sample code area
	 * 
	 * @memberof Level1.prototype 
	 */
	update: function() {
		// update stuff for the map, like checking if the player collides with a wall etc.

		/* check which sprites collides against the player and if so set their velocity to 1.
		 * also log which sprites are moving in a array movingSprites
		 */
		var movingSprites = [];
		_.each(this.map.sprites, function(sprite) {
			if (this.map.collide(sprite, this.map.player)) {
				// If you hit this line it means your this.map.player has 
				// hit a sprite.
				// You can now uncomment the 'debugger' line below, :w and wait for `grunt` to run
				// the "copy:dist" (copy) task
				// then your live request will refresh your browser and 
				// we can see what is happening using the chrome or firebug inspectors:
				// debugger;

				// Well the first thing we need is to navigate tiled worlds
				if (sprite.onCollisionGotoGame) {
					// let us go to that map.
					this.map.gotoGame(sprite.onCollisionGotoGame, sprite.onCollisionGotoGameMessage); 
					return;
				};
				// or maybe we want to do it right with state
				if (sprite.onCollisionGotoMap) {
					this.game.state.start('gameover', true, false, sprite.onCollisionGotoMap);
					return;
				};
				
				/**
				 * @prop onCollisionText
				 *
				 * A property you can give to tiled objects, or their parent object layer to show text in the game for 5 seconds.
				 */
				if (sprite.onCollisionText && !sprite.text) {
					var t = this.game.add.text(sprite.x, sprite.y, sprite.onCollisionText, {
						font: '16px Arial',
						fill: '#ffffff',
						align: 'center'
					});
					t.anchor.setTo(0.5, 0.5);
					sprite.text = t;
					window.setTimeout(function() {
						t.destroy();
						sprite.text = null;
					},5000);
				};

				// now we done with our special tiled properties let us check if it is immovable or else do the needed physics.
				if (sprite.immovable) return;

				// While we wait for other mortals to find this debug point we 
				// will just wiggle the body of the sprite.
				sprite.body.velocity.x = this.map.player.body.velocity.x;
				sprite.body.velocity.y = this.map.player.body.velocity.y;
				// and push it into a local array movingSprites, which 
				// soon will get promoted to this.movingSprites, or where ever our game goes.
				movingSprites.push(sprite);
			} else if (sprite.body) {
				// Well we did not collide aka touched it so lets just 
				// sets its velocity back to zero
				sprite.body.velocity.set(0);
			};
		}, this);

		// now we test the moving sprites against the sprites to make sure they don't overlap each other.
		_.each(movingSprites, function(movingSprite) {
			_.each(this.map.sprites, function(sprite) {

				if (this.map.collide(sprite, movingSprite)) {
					sprite.body.velocity.set(0);
					movingSprite.body.velocity.set(0);
				};
			}, this);
		}, this);


		// We do the map update last to make sure sprites does not push sprites over 
		// collision layers.
		this.map.update();
	}

	// 
	// This is the end for the basic state function  you need, your sandbox 
	// is a lot bigger than this file, your next move would be [github] and 
	// contributing to [phaser], [tiled] and this project.
	//
};
// Export our Level1 State Constructor to the Browsify and Node peeps.
module.exports = Level1;

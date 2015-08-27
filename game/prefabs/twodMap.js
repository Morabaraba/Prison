'use strict';
var _ = require('underscore');

/**
 * Our map constructor with the player, sprites, collisionLayers, tiletsets, etc.
 * 
 * @class
 */
var TwodMap = function(game, key) {
	Phaser.Tilemap.call(this, game, key);

	this.key = key;
	/**
	 * @property player - when `createObjects()` gets called it will also populate this property.
	 */
	this.player;
	/** @property sprites - when `createObjects()` gets called it will also populate this property. */
	this.sprites;
	this.collisionLayers = [];
	this.tilesets.forEach(function(tileset) {
		this.addTilesetImage(tileset.name)
	}, this);
};

TwodMap.prototype = Object.create(Phaser.Tilemap.prototype);
TwodMap.prototype.constructor = TwodMap;

TwodMap.prototype.gotoGame = function(url, message) {
	if (!message) {
		window.location = url;
		window.location.reload(true);
		return;
	};
	this.game.state.start('gotoGame', true, false, url, message);

};

TwodMap.prototype.collide = function(obj1, obj2) {
	try {
		return this.game.physics.arcade.collide(obj1, obj2);
	} catch (e) {
		// silent log of a bug I need to fix TODO
		return e;
	}
};
TwodMap.prototype.update = function() {
	_.each(this.collisionLayers, function(layer) {
		// player against physics layers
		this.collide(this.player, layer);
		// sprites(Tiled Objects) against collisionLayers
		_.each(this.sprites, function(sprite) {
			this.collide(sprite, layer);
		}, this);
	}, this);
};

TwodMap.prototype.createObjects = function() {
	var result = [];
	var mapData = this.game.cache.getTilemapData(this.key).data;
	_.each(this.objects, function(layer, name) {
		_.each(layer, function(object) {
			// So tiled objects can use a key as in a key name you loaded with phaser.load into the cache
			var key;
			if (object.properties.key) {
				key = object.properties.key;
			} else {
				key = 'gid-' + object.gid;
				// here we forge bitmaps from the `tileset[0]` using the gid assigned by [Tiled]
				var bitmap = this.game.add.bitmapData(32, 32, key, true);
				// and how do we know there will only be one tileset
				this.tilesets[0].draw(bitmap.context, 0, 0, object.gid);
				//var bitmap = this.game.add.BitmapData(32, 32, 'gid-' + object.gid, true);
				key = bitmap;
			}
			// TODO ugly code why can we not load prefab's dynamically with browserfy(I tried btw)
			if (name === 'player') {
				var TwodCursor = require('./twodCursor');
				this.player = new TwodCursor(this.game, object.x, object.y - 32, key);
				this.player.cursors = this.game.input.keyboard.createCursorKeys();
				this.game.world.add(this.player);
				this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
				this.player.body.collideWorldBounds = true;
				// note we don't add the player by design to the result array. We want people to use map.player.
				return;
			};
			// Ugly hack to get the visibility
			var layerData = _.find(mapData.layers, function(i) {
				return i.name === name;
			}, this);
			if (!layerData.visible) return;
			// Objects will always copy the properties from their Object layers
			_.extend(object.properties, layerData.properties);

			
			var sprite = this.game.add.sprite(object.x, object.y - 32 /* subtract tile height, don't know why */ , key);
			result.push(sprite);
			sprite.properties = object.properties;
			_.extend(sprite, object.properties);
			if (sprite.properties.physics) {
				this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
				sprite.body.collideWorldBounds = true;
				if (sprite.properties.immovable) {
					sprite.body.immovable = true;
				};
				if (sprite.properties.bodyMass) {
					sprite.body.mass = sprite.properties.bodyMass;
				};
			};
		}, this);
	}, this);
	this.sprites = result;
	return result;
};
TwodMap.prototype.createLayers = function() {
	var result = [];
	this.layers.forEach(function(layer) {
		var mapLayer = this.createLayer(layer.name);
		// TODO why does create not set the name
		mapLayer.name = layer.name;
		result.push(mapLayer);
		if (layer.properties.physics) {
			this.collisionLayers.push(mapLayer);
			this.setCollisionByExclusion([], true, mapLayer);
		};
		_.extend(mapLayer, layer.properties);
	}, this);
	return result;
};

TwodMap.prototype.createText = function(x, y, text, delay) {
	return this.game.add.text(x, y, text, {
		font: '16px Times New Roman',
		fill: 'black',
		wordWrap: true,
		wordWrapWidth: this.game.width - x - 48,
		stroke: 'white',
		strokeThickness: 4
	});
/*	window.setTimeout(function() {
		t.destroy();
	}, delay || 5000);*/
};

module.exports = TwodMap;

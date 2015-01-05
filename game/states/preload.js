'use strict';
var _ = require('underscore');

function Preload() {
	this.asset = null;
	this.ready = false;
	this.stateName = 'play';
}

Preload.prototype = {
	preload: function() {
		// Ok let us get a gif up on the screen showing we are loading stuff
		this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
		this.asset.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.asset);

		// ok this is where we start to build the prison, you can specify which tiled map json file to use
		// in the hash of the url, or it downloads 'assets/maps/prison.json'.
		//
		// TODO I'm not happy with this code,
		var mapLoader;
		if (window.location.hash === "")
			mapLoader = this.game.load.tilemap('map', 'assets/maps/prison.json', null, Phaser.Tilemap.TILED_JSON);
		else {
			var mapLoader = this.game.load.tilemap('map', window.location.hash.substr(1), null, Phaser.Tilemap.TILED_JSON);
		}
		mapLoader.onLoadComplete.addOnce(function() {
			this.mapLoadAssets()
		}, this);
		mapLoader.onFileError.addOnce(function() {
		  // why yo no call #TODO
            console.log("mapLoader filed on receiving a file");
			console.log(arguments);
		}, this);
	},
	create: function() {
		this.asset.cropEnabled = false;
	},
	update: function() {
		if (this.assetsReady) {
			this.game.state.start(this.stateName);
		}
	},
	mapLoadAssets: function() {
		var map = this.game.cache.getTilemapData('map').data;
		if (map.properties.state) this.stateName = map.properties.state;
		if (!map.properties.assets) {
			this.assetsReady = true;
			return;
		}
		// TODO this way of loading feels hackish
		var assetsLoader = this.game.load.json('assets', map.properties.assets);
		assetsLoader.onLoadComplete.addOnce(function() {
			var assets = this.game.cache.getJSON('assets');
			_.each(assets, function(asset) {
				// lets check the type to decide which loader to use
				if (asset.type === "tilemap")
					this.game.load.tilemap(asset.key, asset.url);
				if (asset.type === "image")
					this.game.load.image(asset.key, asset.url);
			}, this);
			this.game.load.onLoadComplete.addOnce(function() {
				this.assetsReady = true;
			}, this);
			this.game.load.start();
		}, this);
		assetsLoader.start();
	},
	mapLoadTileset: function() {
		var map = this.game.cache.getTilemapData('map').data;
		map.tilesets.forEach(function(tileSet) {
			// TODO fix hard coded path
			//debugger;
			window.game = this.game;
			var imageLoader = this.game.load.image(tileSet.name, tileSet.image);
			imageLoader.onFileError.addOnce(function() {
				// meh load the default image for it.
				// TODO this will bite you in the ass
				var imageLoader2 = this.game.load.image(tileSet.name, '/assets/prison.png');
				imageLoader2.start();
			}, this);
		}, this);
		_.each(map.layers, function(layer) {
			if (layer.type === 'objectgroup')
				_.each(layer.objects, function(object) {}, this);
		}, this);
		this.game.load.onLoadComplete.addOnce(function() {
			this.tilesetsReady = true;
		}, this);
		this.game.load.start();
	},
};

module.exports = Preload;

# Prison

## Introduction

> A [player] in a prison, created by pattern-makers.

A simple game allowing you to create your own [tiled] maps and load it with [phaser.io] as a game.

Please note some of this instructions does not include packages you will need right now. So if you follow the instructions make sure you understand what you are installing.

### Ubuntu

If you have nothing installed on your machine and just want to get this project going follow the instructions below.

Execute the following commands from your ubuntu terminal:

	sudo apt-get install node tiled
	sudo npm install bower kanso grunt-cli -g 
	
	URL=prison@ludo.wifi:~/project/prison
	git clone $URL
	cd prison

### OS X

[Brew], I believe all the tools installs easily enough from a OS X side that I don't have to waste bytes.

## Setup

If everything went well you have the power of a thousand JavaScript ninja warriors, the current facebook generation.

Now let us setup our local packages and tools for our project. Starting with the node package manager(npm).

	npm install
	bower install
	kanso install

`npm install` install all the packages as specified in `vim package.json`. You will see I sneaked in a [bower] and [kanso] install. I'm using kanso to publish to couchdb. I will be using [pouchdb] very soon'ish for cloud integration.

You can change the resolution of your game in `vim config.json`. 

## Play

If everything went well you can:

  grunt

and then from os x `open http://localhost:5083` or use [chrome] `chromium-browser http://localhost:5083` on ubuntu, btw chrome is our default web browser at the moment, 

You will then see our first prison in your browser. Move around with the up, down, left, right.

Now you can go play in `vim game/states/play.js` and after each :w in vim, your web browser should refresh with your updated javascript to the play [state] of the game. This also counts for any assets you have in the `cd assets` directory. We use [tiled] to create our assets/maps/prison.json file. I started with my own 2d(twod) set of tools wrapping [phaser] objects to create a game, and you will see I'm building my own property system on tiled, linking:

	digraph tiled_twod_phaser_diagram {
		"tiled"->"twod"
		"twod"-> "phaser";
	}

I will document this as I go along but I'm mostly working in game/prefabs and around the other [states]. Please note this project was created with the official-phaser yo generator, so install yo, and help me figure out how the two sub-generators work.

	sudo npm install yo generator-official-phaser -g

but I'm leaving `vim assets/prison.json` and `vim game/states/play.js` for each player to decide if they want to follow my game, or create their own. If you do create your own game, please share it with me, or you can help by giving me feedback and correcting me when I bastardize your favourite tool.

## The Grunt

> The warthog part is true, I was on holiday while I played with phaser.

You will not believe but I was approached by a warthog just minutes ago, a single tooth warthog. We will call him `grunt`. He is the runner of the show, he create dist/ and he feeds our browser. You can change the settings that will be passed for the bootstrapper in `vim config.json` you can change the template that generates the main.js in:

> var bootstrapper = grunt.file.read('templates/_main.js.tpl');

## License 

The MIT License

[tiled]: http://www.mapeditor.org/
[phaser.io]: http://phaser.io/

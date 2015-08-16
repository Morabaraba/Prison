## Prison

Enter the pattern prison, if you want to become a master, start to create your own [tiled] maps and load it with [phaser.io] as a game.

You can [play the current game][WebApp] by clicking on the image below.

<a href="http://bitly.com/prisonApp"><img src="http://i.imgur.com/3CBNMMz.png"></a>

#### Tiled

Tiled will be our world creator. With properties on objects, tiles, layers or maps you can create a game, all in tiled.
Might even be wicked and add `eval`.

<a href="http://www.mapeditor.org/"><img src="http://www.mapeditor.org/img/screenshot-terrain.png"></a>

#### Phaser.io

A free, fast and flexible framework for HTML5 game creation.

<a href="http://phaser.io/"><img src="http://phaser.io/images/img.png"></a>

### Development 

You might now have realized this is still wip, so any input would be appreciated.
 
#### Game Source Code
- Github: [https://github.com/Morabaraba/Prison](https://github.com/Morabaraba/Prison)
- Docs: [http://bit.ly/prisonApp-docs](http://bit.ly/prisonApp-docs)

[WebApp]: http://bit.ly/prisonApp
[tiled]: http://www.mapeditor.org/
[phaser.io]: http://phaser.io/

#### Ubuntu

If you have nothing installed on your machine and just want to get this project going follow the instructions below.

Execute the following commands from your ubuntu terminal:

```sh
	sudo apt-get install npm tiled
	sudo npm install bower grunt-cli -g 
	
	mkdir ~/project
	cd ~/project/
	URL=https://github.com/ludoza/Prison.git
	git clone $URL
	cd prison
```
	
#### OS X

[Brew], I believe all the tools installs easily enough from a OS X side that I don't have to waste bytes.

[Brew]: http://brew.sh/

#### Setup

If everything went well you have the power of a thousand JavaScript ninja warriors, the current facebook generation.

Now let us setup our local packages and tools for our project. Starting with the node package manager(npm).

```sh
	npm install
	bower install
```

`npm install` install all the packages as specified in `vim package.json`. 

You can change the resolution of your game in `vim config.json`. 

#### Play

If everything went well you can:

```sh
	grunt
```

You will then see our first prison in your browser. Move around with the up, down, left, right.

## License 

The MIT License

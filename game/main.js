'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(512, 512, Phaser.AUTO, 'prison', {}, true);

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('gotoGame', require('./states/gotoGame'));
  game.state.add('level1', require('./states/level1'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};

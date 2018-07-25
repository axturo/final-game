var game = new Phaser.Game(800, 650, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('mc', 'spreadsheets/running-animation.png', 220, 290);
    game.load.image('background', 'spreadsheets/background.png');
    game.load.spritesheet('ground', 'spreadsheets/animated-platform.png', 320, 60);
    game.load.spritesheet('enemy', 'spreadsheets/common-enemy.png', 250, 310);

}

var keys;
var enemy;
var player;
var enemy; 
var ground;
var platforms;

function create() {
    
    background = game.add.sprite(0, 0, 'background');
    
    background.height = game.height;
    background.width = game.width;
    background.smoothed = false;
    
    platforms = game.add.group();
    ground = platforms.create(0, game.world.height - 60, 'ground');
    ground.scale.setTo(1, 1);
    game.physics.arcade.enable(ground);
    ground.body.immovable = true;
    
    player = game.add.sprite(32, game.world.height - 150, 'mc');
    player.scale.setTo(0.2,0.2);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 2000;
    
    game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('right', [8, 9, 10, 12, 13], 9, true);
    player.animations.add('idle', [6, 7], 2,  true);
    
    var ledge1 = platforms.create(400, 450, 'ground');
    var ledge2 = platforms.create(50, 250, 'ground');
    var ledge3 = platforms.create(500, 150, 'ground');
    
    game.physics.arcade.enable(platforms);
    
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
    ledge3.body.immovable = true;
    
    enemies = game.add.group();
    
    enemies.create(550, 390, 'enemy');
    enemies.create(100, 185, 'enemy');
    enemies.create(600, 85, 'enemy');
    
    enemies.callAll('animations.add', 'animations', 'float', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 12, true)
    
    game.physics.arcade.enable(enemies);
    
    enemies.callAll('animations.play', 'animations', 'float');
    enemies.forEach(function(enemy) {
        enemy.scale.setTo(0.2, 0.2);
        enemy.body.gravity.y = 2000;
        enemy.body.velocity.x = -100;
    });
  
}

function update() {
    
//    game.physics.arcade.collide(enemies, platforms);
    
    game.physics.arcade.collide(enemies, platforms, function (enemy, platform) {
        if (enemy.body.velocity.x > 0 && enemy.x > platform.x + (platform.width - enemy.width) ||
                enemy.body.velocity.x < 0 && enemy.x < platform.x) {
            enemy.body.velocity.x *= -1; 
        } 
        if (enemy.body.velocity.x > 0) {
            enemy.animations.play('right');
        } else {
            enemy.animations.play('left');
        }
    });    

    game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, platforms);
    
    // key controls below
    
    if (leftButton.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (rightButton.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.body.velocity.x = 0;
        player.animations.play('idle');
    }
    
    if (upButton.isDown && player.body.touching.down) {
        player.body.velocity.y = -950;
    }
}


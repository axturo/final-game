var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('mc', 'spreadsheets/running-animation.png', 220, 290);
    game.load.image('background', 'spreadsheets/background.png');
    game.load.spritesheet('ground', 'spreadsheets/platform2.png', 320, 60);
 
    game.load.tilemap('level1', 'thenon-organic life of solace.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'lifeofsolace3.0.png');

    game.load.spritesheet('enemy', 'spreadsheets/common-enemy.png', 250, 310);
    game.load.spritesheet('common', 'spreadsheets/common-sprite.png', 250, 310);
    
}

var keys;
var enemy;
var common;
var player;
var ground;
var platforms;

function create() {
    
    // background
    
    background = game.add.sprite(0, 0, 'background');
    
    background.height = game.height;
    background.width = game.width;
    background.smoothed = false;
    
    // map
    
    map = game.add.tilemap('level1');
    map.addTilesetImage('lifeofsolace3.0', 'tiles');
    
    map.createLayer('Tile Layer 1');
    
    // creating platforms
    
    platforms = game.add.group();
    ground = platforms.create(0, game.world.height - 100, 'ground');
    ground.scale.setTo(1, 1);
    game.physics.arcade.enable(ground);
    ground.body.immovable = true;
    
    // creating player
    
    player = game.add.sprite(32, game.world.height - 175, 'mc');
    player.scale.setTo(0.2,0.2);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 2000;
    
    // controls
    
    game.input.keyboard.createCursorKeys();
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    // player animations
    
    player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('right', [8, 9, 10, 12, 13], 10, true);
    player.animations.add('idle', [6, 7], 2,  true);
    game.camera.follow(player); 
    
    // code creating ledges
    
    var ledge1 = platforms.create(400, 450, 'ground');
    var ledge2 = platforms.create(50, 250, 'ground');
    var ledge3 = platforms.create(500, 150, 'ground');
    
    // map creating ledges
    
    map.createFromObjects('The platform layer', 'platform', 'ground', 0, true, false, platforms, undefined, false);
    
    // physics
    
    game.physics.arcade.enable(platforms);
    
    platforms.forEach(function(platform) {
        platform.body.immovable=true
    })
    
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
    ledge3.body.immovable = true;
    
    // creating enemies
    
    enemies = game.add.group();
    
    enemies.create(550, 390, 'enemy');
    enemies.create(100, 185, 'enemy');
    enemies.create(600, 85, 'enemy');
    
    enemies.callAll('animations.add', 'animations', 'float', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 12, true)
    
    game.physics.arcade.enable(enemies);
    
    enemies.callAll('animations.play', 'animations', 'float');
    enemies.forEach(function(enemy) {
        enemy.scale.setTo(0.15, 0.15);
        enemy.body.gravity.y = 2000;
        enemy.body.velocity.x = -100;
    });
    
    // creating the common little dudes
    
    commons = game.add.group();
    
    commons.create(1000, 2640, 'common');
    
    commons.callAll('animations.add', 'animations', 'float', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 12, true)
    
    game.physics.arcade.enable(commons);
    
    game.world.setBounds(0, 0, 3200, 3200);
<<<<<<< HEAD
    
    game.camera.follow(player);  
=======
     
>>>>>>> a01041d306b096210985a0bff9bce4dff968d853
    commons.callAll('animations.play', 'animations', 'float');
    common.forEach(function(common) {
        common.scale.setTo(0.2, 0.2);
        common.body.gravity.y = 2000;
        common.body.velocity.x = -100;
    });
<<<<<<< HEAD
    
=======
>>>>>>> a01041d306b096210985a0bff9bce4dff968d853
}

function update() {
    
    // virus physics!
    
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
    
    // common little dudes physics!
    
    game.physics.arcade.collide(commons, platforms, function (common, platform) {
        if (common.common.velocity.x > 0 && common.x > platform.x + (platform.width - common.width) ||
                common.body.velocity.x < 0 && common.x < platform.x) {
            common.body.velocity.x *= -1; 
        } 
        if (common.body.velocity.x = 0) {
            common.animations.play('idle');
        }
    });   
    
    // player physics

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

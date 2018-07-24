var game = new Phaser.Game(800, 650, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('mc', 'spreadsheets/running-animation.png', 220, 290);
    game.load.image('background', 'spreadsheets/background.png');
    game.load.image('ground', 'spreadsheets/platform2.png');
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
    
    enemy = game.add.sprite(550, 390, 'enemy');
    enemy.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 2000;
    enemy.body.velocity.x = -100;
    
    enemy1 = game.add.sprite(100, 185, 'enemy');
    enemy1.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy1.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy1.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(enemy1);
    enemy1.body.gravity.y = 2000;
    enemy1.body.velocity.x = -125;    
        
    enemy2 = game.add.sprite(600, 85, 'enemy');
    enemy2.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy2.animations.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
    enemy2.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(enemy2);
    enemy2.body.gravity.y = 2000;
    enemy2.body.velocity.x = -150;    
    
}

function update() {
    
    // enemy first ledge
    
    game.physics.arcade.collide(enemy, platforms, function (enemy, platform) {
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
    
    // enemy second ledge
    
    game.physics.arcade.collide(enemy1, platforms, function (enemy, platform) {
        if (enemy1.body.velocity.x > 0 && enemy1.x > platform.x + (platform.width - enemy1.width) ||
                enemy1.body.velocity.x < 0 && enemy1.x < platform.x) {
            enemy1.body.velocity.x *= -1; 
        } 
        if (enemy1.body.velocity.x > 0) {
            enemy1.animations.play('right');
        } else {
            enemy1.animations.play('left');
        }
    });    
    
    // enemy third ledge
    
    game.physics.arcade.collide(enemy2, platforms, function (enemy, platform) {
        if (enemy2.body.velocity.x > 0 && enemy2.x > platform.x + (platform.width - enemy2.width) ||
                enemy2.body.velocity.x < 0 && enemy2.x < platform.x) {
            enemy2.body.velocity.x *= -1; 
        } 
        if (enemy2.body.velocity.x > 0) {
            enemy2.animations.play('right');
        } else {
            enemy2.animations.play('left');
        }
    });    
    
//    game.physics.arcade.collide(enemy, platforms);
 
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


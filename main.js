var game = new Phaser.Game(800, 650, Phaser.AUTO, 'game-div', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('mc', 'spreadsheets/running-animation.png', 320, 320);
    game.load.image('background', 'spreadsheets/background.png');
    game.load.image('ground', 'spreadsheets/platform2.png', 32, 32);

}

var keys;
var player;
var ground;
var platforms;

function create() {
    
    background = game.add.sprite(0, 0, 'background');
    
    background.height = game.height;
    background.width = game.width;
    background.smoothed = false;
    
    platforms = game.add.group();
    
    // Here we create the ground.
    ground = platforms.create(0, game.world.height - 10, 'ground');
    
    //  Double the size of the platform (vertically by 2 and horizontally by 2)
    ground.scale.setTo(10, 20);
    
    //  We need to enable physics on the ground so that it can move and collide with stuff
    game.physics.arcade.enable(ground);
    
    //  This stops the ground from falling away when you jump on it
    ground.body.immovable = true;
    
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'mc');
    player.scale.setTo(0.2,0.2);
    
    //  We need to enable physics on the player so that it can move and collide with stuff
    game.physics.arcade.enable(player);
    
    //  Player physics properties.
    player.body.gravity.y = 800;
    
    //  Our controls.
    keys = game.input.keyboard.createCursorKeys();
    
    // Add animations to the player
    player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('right', [7, 8, 9, 10, 12, 13], 10, true);
    
    //  Now let's create two ledges
    var ledge1 = platforms.create(400, 400, 'ground');
    var ledge2 = platforms.create(-150, 250, 'ground');
    
    // Enable physics on the platforms so you can collide with them
    game.physics.arcade.enable(platforms);
    
    // Prevent the ledges from moving
    ledge1.body.immovable = true;
    ledge2.body.immovable = true;
}

function update() {
    
    // Check for collisions between the player and the ground
    game.physics.arcade.collide(player, ground);
    
    // Check for collisions between the player and all platforms
    game.physics.arcade.collide(player, platforms);
    
    if (keys.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (keys.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 6;
    }
    
    if (keys.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -800;
    }
}


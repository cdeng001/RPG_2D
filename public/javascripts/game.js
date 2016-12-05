var game = new Phaser.Game(500, 350, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    // load the tiled map, notice it is "tiledmap" and not "tilemap"
    game.load.tilemap('sample', 'assets/tilemap/sample_256x256.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('roguelikeSheet_transparent', 'assets/images/roguelikeSheet_transparent.png');
    game.load.spritesheet('hero', 'assets/images/character.png', 16, 16);
}

function create() {
    map = game.add.tilemap('sample');

    map.addTilesetImage('roguelikeSheet_transparent');

    layerLand = map.createLayer('Land');
    layerOcean = map.createLayer('Ocean');

    map.setCollision([1,2], true, layerOcean, true);
    map.setCollision([3,4,5,58,59,60,61,62,115,116,117,118,119], true, layerLand, true);

    game.world.setBounds(0, 0, 4096, 4096);

    hero = game.add.sprite(300, 200, 'hero');

    game.physics.enable(hero, Phaser.Physics.ARCADE);

    hero.body.setSize(16,16,0,0);

    hero.animations.add('walk_right', [8,9,10,11]);
    hero.animations.add('walk_left', [12,13,14,15]);
    hero.animations.add('walk_up', [4,5,6,7]);
    hero.animations.add('walk_down', [0,1,2,3]);
    game.camera.follow(hero);
}

function update() {

    //hero collision with water
    game.physics.arcade.collide(hero, layerLand, function(h, l){

    }, null, this);
    game.physics.arcade.collide(hero, layerOcean);

    //hero.body.velocity.set(0);

    var spd = 100,
        fr = 4;
    if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
        spd *= 3;
        fr *= 3;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        hero.body.velocity.y = -spd;
        hero.body.velocity.x = 0;
        hero.animations.play('walk_up', fr, true);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        hero.body.velocity.y = spd;
        hero.body.velocity.x = 0;
        hero.animations.play('walk_down', fr, true);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        hero.body.velocity.x = -spd;
        hero.body.velocity.y = 0;
        hero.animations.play('walk_left', fr, true);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        hero.body.velocity.x = spd;
        hero.body.velocity.y = 0;
        hero.animations.play('walk_right', fr, true);
    }
    else{
        hero.body.velocity.set(0);
        hero.animations.stop();
        hero.frame = 0;
    }
}

function render() {

    game.debug.body(hero);

}
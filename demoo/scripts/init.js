// Инициализация игры после загрузки страницы

window.onload = async () => {
    const game = new StoneMasonCore(800,600);
    const script = new MyScript(game);

    await game.assets.loadImage('player', 'assets/player.png');
    await game.assets.loadImage('enemy', 'assets/enemy.png');
    await game.assets.loadImage('coin', 'assets/coin.png');
    await game.assets.loadImage('projectile', 'assets/projectile.png');
    await game.assets.loadAudio('bg','assets/bg.mp3');
    await game.assets.loadAudio('shot','assets/shot.mp3');
    await game.assets.loadAudio('getshot','assets/getshot.mp3');
    await game.assets.loadAudio('doshot','assets/doshot.mp3');
    await game.assets.loadAudio('hit','assets/hit.mp3');
    await game.assets.loadAudio('cgrab','assets/coin.mp3');

    const player = game.createEntity({
        x: 400,
        y: 300,
        width: 32,
        height: 32,
        sprite: 'player',
        speed: 5,
        hp: 5,
        shootangle:0,
        delay: 0,
        coins: 0,
        onUpdate: (game, entity) => {
            entity.delay++;

            // Управление стрелками
            if(game.input.isKeyPressed('KeyW')) entity.y -= entity.speed;
            if(game.input.isKeyPressed('KeyS')) entity.y += entity.speed;
            if(game.input.isKeyPressed('KeyA')) entity.x -= entity.speed;
            if(game.input.isKeyPressed('KeyD')) entity.x += entity.speed;
            if(game.input.isKeyPressed('KeyE')) script.doenemy();

            if (entity.delay>5){
                if(game.input.isKeyPressed('ArrowUp')) {   script.doshot(3);game.assets.playAudio('shot', { loop: true, volume: 0.5 });}
                if(game.input.isKeyPressed('ArrowDown')){  script.doshot(2);game.assets.playAudio('shot', { loop: true, volume: 0.5 });}
                if(game.input.isKeyPressed('ArrowLeft')){  script.doshot(1);game.assets.playAudio('shot', { loop: true, volume: 0.5 });}
                if(game.input.isKeyPressed('ArrowRight')){ script.doshot(0);game.assets.playAudio('shot', { loop: true, volume: 0.5 });}
                
                entity.delay = 0;
            }

            // Границы экрана
            entity.x = Math.max(0, Math.min(game.canvas.width - entity.width, entity.x));
            entity.y = Math.max(0, Math.min(game.canvas.height - entity.height, entity.y));
        }
        });

    //entity.vx = Math.cos(angle) * entity.speed;
    //entity.vy = Math.sin(angle) * entity.speed;

    script.setPlayer(player);
    
    let audioStarted = false;

    //костыль для аудио
    document.addEventListener('click', () => {
        if (!audioStarted) {
            game.assets.playAudio('bg', { loop: true, volume: 0.2 });
            audioStarted = true;
        }
    }, { once: true });

    game.start();
};
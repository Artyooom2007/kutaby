class MyScript{
    constructor(game){
        this.game = game;
        this.player = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    doshot(mx,my){
        // Создаём снаряд
        const projectile = this.game.createEntity({
            x: this.player.x,
            y: this.player.y,
            width: 16,
            height: 16,
            sprite: 'projectile',
            speed: Random(5)+15,
            angle: (FromToAngle(this.player.x,this.player.y, mx, my)+ ((Random(20)-10)/100)),
            onUpdate: (game, entity) => {

                const move = MoveAngle(entity.angle,entity.speed);
                entity.x += move.x;
                entity.y += move.y;

                if (entity.x > Math.max(0, Math.min(game.canvas.width - entity.width, entity.x))||entity.x < Math.max(0, Math.min(game.canvas.width - entity.width, entity.x))){
                    game.removeEntity(entity);}
                if (entity.y > Math.max(0, Math.min(game.canvas.height - entity.height, entity.y))||entity.y < Math.max(0, Math.min(game.canvas.height - entity.height, entity.y))){
                    game.removeEntity(entity);}

                // Проверка столкновений с врагами
                game.entities.forEach(other => {
                    if (other.sprite === 'enemy') {
                        const isColliding = 
                            entity.x < other.x + other.width &&
                            entity.x + entity.width > other.x &&
                            entity.y < other.y + other.height &&
                            entity.y + entity.height > other.y;
                            
                        if (isColliding) {
                            other.hp -= 1;
                            game.assets.playAudio('doshot', { loop: true, volume: 0.5 })
                            game.removeEntity(entity);
                        }
                    }
                });
            }
        });
    }
    doenemy(){
        const enemy = this.game.createEntity({
            x: (Random(800)),
            y: (Random(600)),
            width: 32,
            height: 32,
            sprite: 'enemy',
            speed: 2,
            hp: 5,
            onUpdate: (game, entity) => {

                const angle = FromToAngle(entity.x, entity.y,this.player.x+(Random(100)-50), this.player.y+(Random(100)-50));
                const move = MoveAngle(angle, entity.speed);

                entity.x += move.x;
                entity.y += move.y;

                if (entity.hp<=0) {this.docoin(entity.x,entity.y); game.assets.playAudio('hit', { loop: false, volume: 0.5 }); game.removeEntity(entity)};
                
            }
            
        });
    }
    docoin(myx,myy){
        const coin= this.game.createEntity({
            x: myx,
            y: myy,
            width: 24,
            height: 24,
            sprite: 'coin',
            onUpdate: (game, entity) => {

            const isColliding = 
                this.player.x < entity.x + entity.width &&
                this.player.x + this.player.width > entity.x &&
                this.player.y < entity.y + entity.height &&
                this.player.y + this.player.height > entity.y;

            if(isColliding) {
                game.removeEntity(entity);
                this.player.coins++;
                game.assets.playAudio('cgrab', { loop: true, volume: 0.5 });
                console.log(this.player.coins);
                }
            }
        });
    }  
}
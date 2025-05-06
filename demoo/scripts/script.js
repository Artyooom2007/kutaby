class MyScript{
    constructor(game){
        this.game = game;
        this.player = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    doshot(angl){
        // Создаём снаряд
        const projectile = this.game.createEntity({
            x: this.player.x,
            y: this.player.y,
            width: 16,
            height: 16,
            sprite: 'projectile',
            speed: 12,
            angle: angl,
            onUpdate: (game, entity) => {
                
                switch(entity.angle){
                    case 0: entity.x += entity.speed; break;
                    case 1: entity.x -= entity.speed; break;
                    case 2: entity.y += entity.speed; break;
                    case 3: entity.y -= entity.speed; break;
                }
                
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
            //hvec:0,  Это было для пиздеца ниже
            //vvec:0,
            onUpdate: (game, entity) => {

                const angle = FromToAngle(entity.x, entity.y,this.player.x+(Random(100)-50), this.player.y+(Random(100)-50));
                const move = MoveAngle(angle, entity.speed);

                entity.x += move.x;
                entity.y += move.y;

                /*
                Этот пиздец тут был со времён итерации движка 02!!!
                
                if (this.player.x > entity.x){entity.hvec = 1;} else if (Math.round(this.player.x/2) == Math.round(entity.x/2)){entity.hvec= 0;} else {entity.hvec= 2;}
                if (this.player.y > entity.y){entity.vvec = 1;} else if (Math.round(this.player.y/2) == Math.round(entity.y/2)){entity.vvec= 0;} else {entity.vvec= 2;}

                switch(entity.hvec){
                    case 0: entity.x; break;
                    case 1: entity.x += entity.speed; break;
                    case 2: entity.x -= entity.speed; break;
                }
                switch(entity.vvec){
                    case 0: entity.y; break;
                    case 1: entity.y += entity.speed; break;
                    case 2: entity.y -= entity.speed; break;
                }
                */
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
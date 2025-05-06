/*	STONEMASON SDK V05
	BY CHUOVAKIE
*/
class StoneMasonCore {
	constructor(width,height) {

		this.canvas = document.createElement('canvas');
		WebGL2D.enable(this.canvas);
		this.canvas.id = 'gameCanvas';
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('webgl-2d');
		
		this.entities = [];
		this.input = new Input();
		this.assets = new AssetLoader();
		
		this.audioEnabled = true;
	}
	
	//Создаём энтити
	createEntity(config) {
		const entity = new Entity(config);
		this.entities.push(entity);
		return entity;
	}
	
	//Убиваем энтити
	removeEntity(entity) {
		this.entities = this.entities.filter(e => e !== entity);
	}
	//Запускаем цикл базы (ТОЛЬКО 1 РАЗ В ИНИТ-СКРИПТЕ!!!)
	start() {
	  this.gameLoop();
	}
	//Цикл базы (Обновляется update и render)
	gameLoop() {
	  this.update();
	  this.render();
	  requestAnimationFrame(() => this.gameLoop());
	}
  
	update() {
	  this.entities.forEach(entity => {
		if(entity.onUpdate) entity.onUpdate(this, entity);
	  });
	}
  
	render() {
	  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  
	  this.entities.forEach(entity => {
		if(entity.sprite) {
			this.ctx.drawImage(
			this.assets.getImage(entity.sprite),
			entity.x,
			entity.y,
			entity.width,
			entity.height
		  );
		}else if(entity.color) {

			this.ctx.fillStyle = entity.color;
			this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
		
		}
	  });
	}
  }

  class Entity {
	constructor(config = {}) {

	  Object.keys(config).forEach(key => {
		if (!this.hasOwnProperty(key)) {
		  this[key] = config[key];
		}
	  });
	}

	setProperty(name, value) {
	  this[name] = value;
	  return this;
	}
  }

  class Input {
	constructor() {
	  this.keys = {};

	  document.addEventListener('keydown', e => this.keys[e.code] = true);
	  document.addEventListener('keyup', e => this.keys[e.code] = false);
	}

	isKeyPressed(key) {
	  return !!this.keys[key];
	}
	
	}

class AssetLoader {
	constructor() {
		this.images = {};
		this.sounds = {};
		this.fallbackImage = this.createFallbackImage();
	}
  
	//Заглушка если мы что-то просрали
	createFallbackImage() {
		const canvas = document.createElement('canvas');
		canvas.width = 32;
		canvas.height = 32;
		const ctx = canvas.getContext('2d');
	  
	  	// Error-бокс
		ctx.fillStyle = '#FF00FF';
		ctx.fillRect(0, 0, 32, 32);
  
		const img = new Image();
		img.src = canvas.toDataURL();
		return img;
	}
  
	async loadImage(name, url) {
		try {
			const img = await new Promise((resolve, reject) => {
		  		const image = new Image();
		  		image.onload = () => resolve(image);
		  		image.onerror = () => {
					console.warn(`Сударь! ${url} обосрался!`);
					resolve(this.fallbackImage);
		 		};
				image.src = url;
			});
		
			this.images[name] = img;
	  	} catch (error) {
				console.error(error);
				this.images[name] = this.fallbackImage;
			}
	}
  
async loadAudio(name, url) {
    try {
        const sound = await new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.oncanplaythrough = () => {
                resolve(audio);
            };
            audio.onerror = () => {
                console.warn(`Ошибка загрузки аудио: ${url}`);
                reject(new Error(`Не удалось загрузить аудио: ${url}`));
            };
            
            audio.load();
        });
        
        this.sounds[name] = sound;
    } catch (error) {
        console.error(error);
        this.sounds[name] = null; // Или создайте заглушку
    }
}
  
	getImage(name) {
		return this.images[name] || this.fallbackImage;
	}


	getAudio(name) {
        return this.sounds[name]; 
	}

	
    playAudio(name, options = {}) {
        const audio = this.getAudio(name);
        if (!audio) return;

        if (options.loop || audio.paused) {
            audio.currentTime = 0;
        }
        audio.volume = options.volume || 1.0;
        audio.play().catch(e => console.warn(`Ошибка воспроизведения: ${e}`));
    }

}
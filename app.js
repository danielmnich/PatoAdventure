document.addEventListener('DOMContentLoaded', function () {

    class Background {
        constructor(height, width) {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
            this.ready = false;
            this.image = new Image();
            this.image.onload = () => {
                this.ready = true;
            };
            this.image.src = 'img/background.png';

        }
    }

    class Hero {
        constructor(x, y, speed) {
            this.speed = speed;
            this.x = x;
            this.y = y;
            this.ready = false;
            this.image = new Image();
            this.image.onload = () => {
                this.ready = true;
            };
            this.image.src = 'img/hero.png';
        }
    }

    class Monster {
        constructor(x, y, ) {
            this.x = x;
            this.y = y;
            this.ready = false;
            this.image = new Image();
            this.image.onload = () => {
                this.ready = true;
            }
            this.image.src = "img/monster.png";
        }
    }

    const background = new Background(480, 512);

    const hero = new Hero(0, 0, 256);

    const monster = new Monster(0, 0);

    let monstersCaught = 0;


    const keysDown = {};

    addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    }, false);




    const reset = function () {
        console.log(background);

        console.log(background.width);

/*         hero.x = background.canvas.width / 2;
        hero.y = background.canvas.height / 2; */

        monster.x = 32 + (Math.random() * (background.canvas.width - 96));
        monster.y = 32 + (Math.random() * (background.canvas.height - 96));

    }


    const update = function (modifier) {
        if (38 in keysDown) {
            hero.y -= hero.speed * modifier;
        }
        if (40 in keysDown) {
            hero.y += hero.speed * modifier;
        }
        if (37 in keysDown) {
            hero.x -= hero.speed * modifier;
        }
        if (39 in keysDown) {
            hero.x += hero.speed * modifier;
        }

        if (hero.x <= 20){
            hero.x = 21;
        }
        if (hero.x >= background.canvas.width - 50){
            hero.x = background.canvas.width - 51;
        }
        if (hero.y >= background.canvas.height - 50) {
            hero.y = background.canvas.height - 51;
        }
        if (hero.y <= 20){
            hero.y = 21;
        }

        if (
            hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
        ) {
            monstersCaught++;
            reset();
        }
    }

    const render = function () {

        if (background.ready) {
            background.ctx.drawImage(background.image, 0, 0);
        }

        if (hero.ready) {
            background.ctx.drawImage(hero.image, hero.x, hero.y);
        }

        if (monster.ready) {
            background.ctx.drawImage(monster.image, monster.x, monster.y);
        }

        //licznik pkt

        background.ctx.fillStyle = "rgb(250, 250, 250)";
        background.ctx.font = "24px Helvetica";
        background.ctx.textAlign = "left";
        background.ctx.textBaseline = "top";
        background.ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
    }

    //główna pętla

    const main = function () {
        let now = Date.now();
        let delta = now - then;

        update(delta / 1000);
        render();


        then = now

        requestAnimationFrame(main);
        /* console.log(hero); */

    }

    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    //wywołanie funckji

    let then = Date.now();
    reset();
    main();

});
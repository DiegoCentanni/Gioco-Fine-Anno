var babbo;

function startGame() {
    myGameArea.start();
    babbo = new component(120, 120, 10, 120);
    babbo.loadImages();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 790;
        this.canvas.height = 370;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas-container").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.imageList = [];
    this.actualFrame = 0;
    this.contaFrame = 0;

    this.loadImages = function() {
        for (let i = 0; i < running.length; i++) {
            let img = new Image();
            img.src = running[i];
            this.imageList.push(img);
        }
    };

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    this.update = function() {
        let ctx = myGameArea.context;

        if (this.speedX !== 0 || this.speedY !== 0) {
            this.contaFrame++;
            if (this.contaFrame >= 6) {
                this.contaFrame = 0;
                this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
            }
        }

        let imgAttuale = this.imageList[this.actualFrame];
        if (imgAttuale) {
            ctx.drawImage(imgAttuale, this.x, this.y, this.width, this.height);
        }
    };
}

function updateGameArea() {
    myGameArea.clear();    
    babbo.newPos();        
    babbo.update();        
}

function moveup() {
    babbo.speedY = -3;
 }
function movedown() {
    babbo.speedY = 3;
 }
function moveleft() {
    babbo.speedX = -3;
}
function moveright() {
    babbo.speedX = 3;
 }
function clearmove() {
    babbo.speedX = 0; babbo.speedY = 0;
}
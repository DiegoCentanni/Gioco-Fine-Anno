var ninja;

function startGame() {
    myGameArea.start();
    ninja = new CreaNinja(120, 120, 10, 120);
    ninja.loadImages();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas-container").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function CreaNinja(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.imageList = [];
    this.FotogrammaMostrato = 0;
    this.RallentaAnimazione = 0;

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
            this.RallentaAnimazione++;
            if (this.RallentaAnimazione >= 6) {
                this.RallentaAnimazione = 0;
                this.FotogrammaMostrato = (this.FotogrammaMostrato + 1) % this.imageList.length;
            }
        }
        let imgAttuale = this.imageList[this.FotogrammaMostrato];
        if (imgAttuale) ctx.drawImage(imgAttuale, this.x, this.y, this.width, this.height);
    };
}

function updateGameArea() {
    myGameArea.clear();
    ninja.newPos();
    ninja.update();
}

function moveup()    { ninja.speedY = -3; }
function movedown()  { ninja.speedY =  3; }
function moveleft()  { ninja.speedX = -3; }
function moveright() { ninja.speedX =  3; }
function NinjaFermo(){ ninja.speedX = 0; ninja.speedY = 0; }
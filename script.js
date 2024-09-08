
// variable for board
let board;
let boardWidth = 360; // height & width of this no bcz our background has same dimension
let boardHeight = 640;
let context; // this is to draw on our page

// variable for bird
let birdWidth = 34 // our image is width/height = 408 x 228 hence ration 17/12
let birdHeight = 24
// bird posititon => width/8 to make it left & height/2 to keep it center
let birdX = boardWidth/8
let birdY = boardHeight/2
let birdImg

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


//pipes
let pipeArray = [];
let pipeWidth = 64; // with /height ratio = 354/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth
let pipeY = 0

let topPipeImg;
let bottomPipeImg;

//game Physics
let velocityX = -2 // pipe's moving left speed


window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d") // retrieves a 2D rendering context for the canvas, allowing  to draw shapes, images, text, etc. onto it


    //drawing bird
    // context.fillStyle = "green"
    // context.fillRect(bird.x, bird.y, bird.width, bird.height)

    // loading image
    birdImg = new Image()
    birdImg.src = "./images/flappybird.png"
    birdImg.onload = function(){ // an event handler that triggers once the image (birdImg) has fully loaded. It ensures that the image is only drawn after it has been successfully loaded.
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500) // generating new pipe evry 1.5s
}

// the main game loop which will update frames
function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height) // evertime we are clearing prev frames

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    //pipes
    for(i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }

}

function placePipes(){

    //random value (0 -1) * pipeHeight/2.
    // if 0 -> -128 (pipeHeight/4)
    // if 1 -> -128 -256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    
    let openSpace = boardHeight / 4; 

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false // to check whether the bird has passed the pipe yet
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}
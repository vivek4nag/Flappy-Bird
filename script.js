
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
let birdY = boardHeight/5
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
let velocityY = 0; // bird's jump speed
let gravity = 0.3

let gameOver = false;
let score = 0

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
    setInterval(placePipes, 1200) // generating new pipe evry 1.2s

    document.addEventListener("keydown", moveBird); // whenever i press a key, this movebird function will be called
}

// resetting game & disabling enter key
let enterPressedHandler = function(e){
    if(gameOver && e.key === 'Enter' ){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;

        // Remove the enter key listener after the game resets
        document.removeEventListener('keydown', enterPressedHandler);
    }
};


// the main game loop which will update frames
function update(){
    requestAnimationFrame(update);

    if(gameOver){
        return
    }

    context.clearRect(0, 0, board.width, board.height) // evertime we are clearing prev frames

    //bird
    velocityY += gravity
    // bird.y += velocityY
    bird.y = Math.max(bird.y + velocityY, 0) // so that bird does no go out of canvas from top if we contd press space. just limit the bird.y to top of canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if(bird.y > board.height){
        gameOver = true;
    }

    //pipes
    for(i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        //score updation
        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score +=0.5; // 0.5 bcz there are 2 pipes top & bottom so it is taking both pipe if we make +=1. hencce 0.5*2 = 1 , 1 for each set of pipes
            pipe.passed = true // so that we dont double check once passes
        }

        if(detectCollision(bird, pipe)){
            gameOver = true;
        }
    }


    // clearing pipes which are going off canvas
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){ // checking the x position of pipes which has gone passed 0
        pipeArray.shift() // removes 1st element from array
    }

    //score
    context.fillStyle = "black" // font color to draw score
    context.font= "45px sans-serif"
    context.fillText(score, 5, 45)

    if (gameOver){
        context.font = "25px sans-serif"
        // context.textAlign = "center"
        context.fillText("GAME OVER😢", 100, 150)
        context.fillText(`Your Score is: ${score}`, 95, 190)
        context.fillText("Press Enter to Play Again", 45, 220)
        context.fillText("Use Space or ⬆️ to Jump", 40, 250)

        document.addEventListener('keydown', enterPressedHandler)


        // document.addEventListener('keydown', enterPressedHandler)
        // const enterPressedHandler = function(e){
        //     if(e.key === 'Enter' ){
        //         bird.y = birdY
        //         pipeArray = [];
        //         score = 0
        //         gameOver = false
        //     }
        //     // enter key will be disabled after resetting the game
        //     document.removeEventListener('keydown', enterPressedHandler)
        // }
        // if enter is pressed the enterpress handler will reset the game & disable enter key
    }

}

function placePipes(){

    if(gameOver){
        return
    }

    //random value (0 -1) * pipeHeight/2.
    // if 0 -> -128 (pipeHeight/4)
    // if 1 -> -128 -256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    
    let openSpace = board.height / 4; 

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


function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW"){
        //jump if space or arrowup or W is pressed
        velocityY = -6;

        //reset Game
        // if(gameOver){
        //     bird.y = birdY
        //     pipeArray = [];
        //     score = 0
        //     gameOver = false
        // }
    }
}

// collision detector will take 2 variable - position of bird & position of pipe
function detectCollision(a, b){
    return a.x < b.x + b.width && 
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
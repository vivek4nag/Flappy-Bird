
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

window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d") // used for drawing on board


    //drawing bird
    // context.fillStyle = "green"
    // context.fillRect(bird.x, bird.y, bird.width, bird.height)

    // loading image
    birdImg = new Image()
    birdImg.src = "./images/flappybird.png"
    birdImg.onload = function(){ // when the image gets loaded we are painitng it on canvas
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }
}

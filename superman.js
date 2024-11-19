let fallSpeed = 3; //default speed of superman. Changes with aceleration when game is running
let yposition = 0; //supermans position on the y axis
let AcelSpeed = 0.3; //short for acelerate
let DecelSpeed = 0.6; //short for deceleration rate
let gameRunning = true; //boolean for when superman has landed
let youLost = false; //boolean for loss trigger -> explosion

let state = "start"; //Used to determine if the user is in the main menu or in game.

noStroke();

function setup()
{
    createCanvas (500, 473);
}

function car()
{ 
    fill (100);
    rect (170, 400, 110, 60);

    fill (100); 
    triangle (170, 400, 130, 440, 170, 440);
    
    fill (100);
    rect (130, 440, 40, 20);

    fill (200, 200, 0);
    triangle (170, 410, 137, 438, 170, 438);

    fill (200, 200, 0);
    rect (180, 409, 20, 29);

    fill (0, 0, 0);
    ellipse (160, 460, 30, 30);

    fill (0, 0, 0);
    ellipse (250, 460, 30, 30);

    fill (100, 100, 0);
    ellipse (163, 430, 13, 15);
} 

function superman(x, y)
{

  // Draw the cape
  fill(255, 0, 0); // Red color for cape
  triangle (x - 24, y + 30, x + 25, y + 30, x - 2, y - 20);

  //Body
  fill(0, 0, 255); 
  rect(x - 10, y - 12.5, 20, 30);

  //Legs
  fill(0, 0, 255);
  rect(x - 10, y + 17.5, 7.5, 15);
  rect(x + 2.5, y + 17.5, 7.5, 15);

  //Boots
  fill(255, 0, 0);
  rect(x - 10, y + 32.5, 7.5, 5);
  rect(x + 2.5, y + 32.5, 7.5, 5);

  //Arms
  fill(0, 0, 255); 
  rect(x - 17.5, y - 12.5, 7.5, 20); 
  rect(x + 10, y - 12.5, 7.5, 20); 

  //Head
  fill(255, 224, 189); 
  ellipse(x, y - 20, 12.5, 12.5);

  //Symbol
  fill(255, 255, 0);
  ellipse(x, y, 9, 9);

}

function explosion()
{
    fill (160); 
    ellipse (200, 400, 200, 200);

    fill (200, 200, 0);
    ellipse (200, 400, 100, 100);

    fill (300, 100, 0);
    ellipse (200, 400, 70, 70);

    fill (300, 0, 0);
    ellipse (200, 400, 20, 20); 
}

function draw(){
    
    if (state === "start") {
        drawStartScreen();
    } 
    else if (state === "game") {
        drawGame();
    }
}

function drawStartScreen(){
    background(130, 180, 300);
    superman(100, 230);

    fill(255);
    ellipse (260, 110, 500, 100);
    fill(255);
    triangle(200, 100, 400, 100, 110, 200);
    textSize(30);
    fill(0);
    text("Welcome to Superman Landing!", 40, 100, 600);
    textSize(25);
    fill (100);
    text("Press any button to Play", 130, 370, 400);


}

function drawGame(){
    background(130, 180, 300);
    fallSpeed = constrain(fallSpeed, -10, 15); //limits the fallspeed

    superman(200, yposition);
    car();



    if (gameRunning === true){
        if (keyIsDown(32))    
        {
        fallSpeed -= DecelSpeed; //decelerate
        } 
        else 
        {
        fallSpeed += AcelSpeed; //acelerate
        }
    
        yposition = yposition + fallSpeed;

        if (yposition > 360) //win and lose condition
        {
            if (fallSpeed > 2)
            {
                gameRunning = false; 
                fallSpeed = 0;  
                console.log("boom");
                youLost = true;
            }
            else 
            {
                gameRunning = false;
                fallSpeed = 0;
                console.log("ez");
            }

        }
    }
    if (youLost === true)
    {
        explosion();
    }

    if (yposition < 0) //keeps superman in bounds of the canvas (sort of)
    {
        yposition = 0;
        fallSpeed = 0;
    }
}

function keyPressed() {
    if (state === "start") 
    {
        state = "game"; 
    }
}



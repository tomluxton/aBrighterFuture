//This exhibition is called "A Brighter Future", wherein people
//passing by would notice the image moving and discover that 
//they can interact with it visa light. When there is a lot of light
//coming from somewhere the image will be perminently revealed. 
//This will prompt users to use a tourch or flashlight to reveal
//the rest of the photo. The first image is always a picture of 
//athletes in the passed, and the photo that is revealed is always a 
//picture of athletes in the present day - this shows that the 
//future/present is always brighter. Thus the name "A Brighter
//Future".

//Here Global Varibles are named appropriatly
//vScale is short for video scale (20px squares)
//imgNum is used to sort out the what image the program is up to
var vScale = 20;
var imgNum = 0;

//row is the array that will be used to grid the image
//imgs is the array used to pic images from to displace on screen
//replaceImgs is an array used to pic images from to replace 
var row = [];
var imgs = [];
var replaceImgs = [];

//These vars are created to store images
var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;

//var used to store camera video
var video;

//var used to store sound effect
var song;

//var used to save table ofgoogle sheets data
var table;

function preload(){
  //Preloads images and stores them in vars
  img0 = loadImage("img0.png");
  img1 = loadImage("img1.jpg");
  img2 = loadImage("img2.jpg");
  img3 = loadImage("img3.jpg");
  img4 = loadImage("img4.jpg");
  img5 = loadImage("img5.jpg");
  img6 = loadImage("img6.jpg");

  //loads data onto table var
  table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vSyj5xs4xNxTkTdRb2bJ9okOH6-MTLVGvzv-52Oqi3zM-UKXZiZD1oE0kfzT7jaj8WWIrHpjv0Os-zu/pub?output=csv", "csv");

  //loads sound onto song array
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(780, 440);
  //proof is run in setup to show that data can be utlised
  //as it console logs data
  proof();
  //pixel density sets the pixel scaling for high pixel density displays
  pixelDensity(1);
	//setImages stores the intial photos in the correct spot,
  //and stores all images in replaceimages for when you press "next"
  //or "prev
  setImages();
  //sets video var to the webcam video, then hides it.
  //DISPLAYING VIDEO
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  video.hide();
	//createArray1() creates a 2D array to be utlised as a grid for the
  //exhibition 
  createArray1();
}

//DATA FILES 
//proof() uses two for loops to go through rows and coloums of a .csv
//files and then prints each tab in the console.
function proof(){
  for (var r = 0; r < table.getRowCount(); r++){
    for (var c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
  	}
  }
}

//setImages() sets the inital images into arrays that are used to 
//display the images, and to replace the displayed images
function setImages(){
  imgs.push(img0);
  imgs.push(img1);
  imgs.push(img2);
	replaceImgs.push(img0);
  replaceImgs.push(img1);
  replaceImgs.push(img2);
  replaceImgs.push(img3);
  replaceImgs.push(img4);
  replaceImgs.push(img5);
  replaceImgs.push(img6);

}

//createArray1() creates a 2D array to be utlised as a grid for the
//exhibition 
function createArray1(){
  for(var i = 0; i < video.height; i++){
    var col = [];
    for(var j = 0; j< video.width; j++){
   		col[j] = 'F'
    }
    row[i] = col;
  }
}


//FUNCTIONS
function draw() {
  background('white');
  
  imageOverlay();
	squaresDetect();
	nextImage();
}

//image overlay sets the images that will be black and white in
//the background
function imageOverlay(){
  image(imgs[1],0,0,width,height-20)
}

//IF STATMENTS
//FOR LOOPS
//ARRAY
//DRAWING IMAGES
//ANIMATION
//TRANSITIONS 
//squares detects goes through two forloops scanning the video for
//rgb values. If rgb values are high var bright will be height
//which is maped to the same scale as vScale. This new value is used
// as the dynamic width (w) of the square
//If a row tab is brighter than 250/255 the value is set to true,
//and the tabs width stays at full until mouse is pressed on one of
//the buttons.
function squaresDetect(){
  video.loadPixels();
  loadPixels();

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width+ x + ( y* video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var w = map(bright, 0, 255, 0, vScale);
      "//noprotect"
      //this below sets what bright needs to be bigger than to stay at fullsize
      if ( 250 < bright || row[y][x] == 'T' ) {
        image(imgs[2], x*vScale,y*vScale, vScale, vScale, x*vScale, y*vScale, vScale, vScale);
        row[y][x] = 'T';
      } else if (row[y][x] == 'F'){
          image(imgs[2], x*vScale,y*vScale, w, w, x*vScale, y*vScale, vScale, vScale);
      }
    }
  }
}

//TEXT DISPLAY
//Next image creats the visuals for the arrays which are to be 
//pressed to incur the next and previous images
//also the text is from the table.
function nextImage(){
  noStroke();
  var triSize = 40;
  fill('white');
  triangle(width -triSize, (height/2) + triSize-20, width -triSize, (height/2) - triSize+20, width, height/2);
  triangle(triSize, (height/2) + triSize-20, triSize, (height/2) - triSize+20, 0, height/2);
  fill('black');
  triangle(triSize-5, (height/2) + triSize-30, triSize-5, (height/2) - triSize+30, 12, height/2);
  triangle(width - triSize+5, (height/2) + triSize-30, width - triSize+5, (height/2) - triSize+30, width -12, height/2);
  textFont('ARIAL');
  textSize(20);
  textStyle(BOLD);
  fill("white");
  text(table.getString(6,0), 5, height/2 + 35);
  text(table.getString(6,1),width-50, height/2 + 35);
}

//DRAWING IMAGES
//INTERACTIVITY 
//PLAYING SOUND
//IF mouse is pressed where the next array is the imgNum is
//increased and the replaceImg is increased to set the new images
//as the images shown.
//The arrays are reset to normal values with createArray1(), and is
//also redrawn. Also the song will play if its not already playing.
//The same is done of the mouse is pressed where the previous is
//except in reverse.
function mousePressed() {
  //next
  if((mouseX> width-40) && (mouseY<height/2+25 && mouseY>height/2-25) && (imgNum<4)){
    imgNum+=2;
    imgs[1] = replaceImgs[(imgNum+1)];
    imgs[2] = replaceImgs[(imgNum+2)];

    createArray1();
    redraw(); 
    
    if ( song.isPlaying()=== false ) {
      song.play();
    }
  //previous
	} else if((mouseX<40) && (mouseY<height/2+25 && mouseY>height/2-25) && (imgNum>0)){
    imgNum-=2;
    imgs[1] = replaceImgs[(imgNum+1)];
    imgs[2] = replaceImgs[(imgNum+2)];

    createArray1();
    redraw(); 
    
    if ( song.isPlaying()=== false ) {
      song.play();
    }
	}
}



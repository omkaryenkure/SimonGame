userClickedPattern=[];
buttonColors=["red","blue","green","yellow"]
gamePattern=[];
var level=0;
var keyPress=0;
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
});
function checkAnswer(currentL){
  if (gamePattern[currentL]===userClickedPattern[currentL]){
    console.log("Success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
            nextSequence();
          }, 1000);
    }
  }
  else {
    console.log("wrong");
    var over =new Audio("sounds/wrong.mp3")
    over.play();
    $("h1").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    var keyPress=0;
    $(document).keypress(function(){
      keyPress++;
      if(keyPress===1){
        gamePattern=[];
        level=0;
        nextSequence();
      }
    });
   }
}
function nextSequence(){
  level++;
  userClickedPattern = [];
  $("h1").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
function playSound(col){
  var raudio = new Audio("sounds/"+ col +".mp3");
  raudio.play();
}
function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){ $("."+currentColour).removeClass("pressed"); }, 100);
}
$(document).keypress(function(){
  keyPress++;
  if(keyPress===1){
    nextSequence();
  }
});

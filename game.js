var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  level++;
  $("h1").text("Level " + level);

  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if(level === 0)
  {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length == userClickedPattern.length)
    {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game over, press any key to restart");

    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

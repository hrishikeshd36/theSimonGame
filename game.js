var started = false;
var level = 0;
var score = 0;

var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];

var userClickedPattern = [];

$(document).keydown(function () {
    if (!started) {
        $("h2").text("Level 0");
        nextSequence();
        started = true;
    }
});

$("h3").click(function () {
    if (!started) {
        $("h2").text("Level 0");
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            score++;

        }

    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h2").text("Game Over,\n Your Score: " + score)
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("h2").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    var btnId = "#" + randomChosenColour;

    $(btnId).fadeOut(100).fadeIn(100).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");


    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
    score = 0;
}

var triviaQuestions = [{
	question: "Where did Mario first make his appearance?",
	answerList: ["Super Mario Bros.", "Mario Land", "Super Nintendo Land", "Donkey Kong"],
	answer: 3,
}, {
	question: "Mario was originally known as:",
	answerList: ["Jumpman", "Plumber Bro", "Luigi", "Italian Man"],
	answer: 0,
}, {
	question: "Before he was a plumber, what was Mario originally?",
	answerList: ["Landscaper", "Construction Worker", "Carpenter", "Painter"],
	answer: 2,

}, {
	question: "Who of the two brothers can jump higher?",
	answerList: ["Mario", "Luigi"],
	answer: 1,
}, {
	question: "What year was Super Mario Bros. Released?",
	answerList: ["1965", "1985", "1975", "1995"],
	answer: 1,
}, {
	question: "What was the first 3D Mario Game?",
	answerList: ["Mario Land", "Super Mario Bros. 3", "Super Mario Galaxy", "Super Mario 64"],
	answer: 3,
}, {
	question: "What's the name of the princess who gets rescued?",
	answerList: ["Peach", "Daisy", "Rosalina"],
	answer: 0,
}, {
	question: "Luigi's very own game on the GameCube is called?",
	answerList: ["Super Luigi's World", "Luigi's Land", "Luigi's Mansion", "Luigi Takes Over"],
	answer: 2,
}, {
	question: "What's the name of the most recent Mario Game?",
	answerList: ["Super Mario Odyssey", "Mario Bros. 3", "Mario Bros. 2", "Dr. Mario"],
	answer: 0,
}, {
	question: "Who's the main villain in the majority of the Mario Games?",
	answerList: ["Yoshi", "Waluigi", "Wario", "Bowser"],
	answer: 3,
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yeepee! That's correct!",
	incorrect: "Nope, not it.",
	endTime: "Times Up!",
	finished: "How'd you do?"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//Generates random questions
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
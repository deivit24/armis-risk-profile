// start button quiz

var currentQuestion = 2;

function startQuiz() {
  document.getElementById('question-1').className = 'question';
  var startBtn = document.getElementById('startQuizBtn');
  startBtn.parentNode.removeChild(startBtn);
}

// get the number of questions
function getNumberOfQuestions() {
  //QuerySelectorAll has better browser support in exchange for being slightly slower than gEBCN.
  var totalQuestions = document.querySelectorAll('.question').length;
  return totalQuestions;
}

// next question
function nextQuestion() {
  hideQuestion(currentQuestion);

  showQuestion(currentQuestion);
  currentQuestion++;
}
function setAnswerButton() {
  //yes, that's correct. this is my lazy way of input validation without annoyning users
  //(e.g. transition on-click events) on the radio buttons...
  document.getElementById('confirm_answer').className = '';
}

function hideAnswerButton() {
  document.getElementById('confirm_answer').className = 'invisible';
}
function hideQuestion(id) {
  var totalQuestions = getNumberOfQuestions();
  for (var i = 1; i <= totalQuestions; i++) {
    if (i !== id) {
      document.getElementById('question-' + i).className = 'question invisible';
    }
  }
}
function showQuestion(id) {
  var totalQuestions = getNumberOfQuestions();
  if (id <= totalQuestions) {
    document.getElementById('question-' + id).className = 'question';
  } else {
    hideAnswerButton(); //begins the end screen process if id is above total question
  }
}

// listen for submit
document.getElementById('quiz').addEventListener('submit', function(e) {
  // hide results
  document.getElementById('answer').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// function to calculate the result of the survey
// initialize variables for each choice's score
// If you add more choices and outcomes, you must add another variable here.
function calculateResults() {
  let c1score = 0;
  let c2score = 0;
  let c3score = 0;
  let c4score = 0;
  let c5score = 0;

  // get a list of the radio inputs on the page
  let choices = document.getElementsByTagName('input');
  // loop through all the radio inputs
  for (i = 0; i < choices.length; i++) {
    // if the radio is checked..
    if (choices[i].checked) {
      // add 1 to that choice's score
      if (choices[i].value == 'c1') {
        c1score = c1score + 0;
      }
      if (choices[i].value == 'c2') {
        c2score = c2score + 5;
      }
      if (choices[i].value == 'c3') {
        c3score = c3score + 10;
      }
      if (choices[i].value == 'c4') {
        c4score = c4score + 15;
      }
      if (choices[i].value == 'c5') {
        c5score = c5score + 20;
      }
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }

  // Find out which choice got the highest score.
  // If you add more choices and outcomes, you must add the letiable here.
  let maxscore = c1score + c2score + c3score + c4score + c5score;

  // Display answer corresponding to that choice
  let answerbox = document.getElementById('answer');
  if (maxscore <= 20) {
    // If user chooses the first choice the most, this outcome will be displayed.
    answerbox.innerHTML = `<span class="redd"><p>You are a Conservative</p></span>`;
  }
  if (maxscore > 20) {
    // If user chooses the second choice the most, this outcome will be displayed.
    answerbox.innerHTML = 'You are moderate';
  }
  if (maxscore >= 60) {
    // If user chooses the third choice the most, this outcome will be displayed.
    answerbox.innerHTML = 'You are a high risk.';
  }
  if (maxscore >= 80) {
    // If user chooses the fourth choice the most, this outcome will be displayed.
    answerbox.innerHTML = 'You gay';
  }
  // If you add more choices, you must add another response below.

  document.getElementById('answer').style.display = 'block';

  document.getElementById('loading').style.display = 'none';
}

// program the reset button
function resetAnswer() {
  window.scrollTo(0, 0);
  window.location.reload();
}

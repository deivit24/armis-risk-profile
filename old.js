/**
 * Created with JetBrains WebStorm.
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

var questions = [{
    question: '1.	What is your current age?',
    choices: [
      'More than 60',
      'Between 51 and 60',
      'Between 41 and 50',
      'Between 31 and 40',
      '30 or younger'
    ],
    riskValue: [0, 5, 10, 15, 20]
  },
  {
    question: '2.	Please estimate when you will need to withdraw 20% of your current portfolio value, such as a need for a house down payment or some other major financial need?',
    choices: [
      'Within the next year',
      '2 – 5 Years from now',
      '5 – 10 Years from now',
      '10 – 20 Years from now',
      'More than 20 Years from now'
    ],
    riskValue: [0, 5, 10, 15, 20]
  },
  {
    question: '3.	If you were to lose your job today, how long will you be able to maintain your current spending life style before you run out of money in your Savings and Checking account? ',
    choices: ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year or More'],

    riskValue: [0, 5, 10, 15, 20]
  },
  {
    question: '4.	What is your total annual income?',
    choices: [
      'Less than $50,000',
      '$50,000 – $100,000',
      '$100,000 – $150,000',
      '$150,000 – $250,000',
      'More than $250,000'
    ],

    riskValue: [0, 5, 10, 15, 20]
  },
  {
    question: '5.	Please rate the stability of your income.',
    choices: [
      'Very Low',
      'Below Average',
      'Average',
      'Above Average',
      'Very High'
    ],

    riskValue: [0, 5, 10, 15, 20]
  }
];

var currentQuestion = 0;
var answers = 0;
var quizOver = false;

$(document).ready(function () {
  // Display the first question
  displayCurrentQuestion();
  $(this)
    .find('.quizMessage')
    .hide();

  // On clicking next, display the next question
  $(this)
    .find('.nextButton')
    .on('click', function () {
      if (!quizOver) {
        value = $("input[type='radio']:checked").val();

        if (value == undefined) {
          $(document)
            .find('.quizMessage')
            .text('Please select an answer');
          $(document)
            .find('.quizMessage')
            .show();
        } else {
          // TODO: Remove any message -> not sure if this is efficient to call this each time....
          $(document)
            .find('.quizMessage')
            .hide();

          if (value == questions[currentQuestion].riskValue) {
            var answers = answers + questions[currentQuestion].riskValue;
          }

          currentQuestion++; // Since we have already displayed the first question on DOM ready
          if (currentQuestion < questions.length) {
            displayCurrentQuestion();
          } else {
            displayScore();
            //                    $(document).find(".nextButton").toggle();
            //                    $(document).find(".playAgainButton").toggle();
            // Change the text in the next button to ask if user wants to play again
            $(document)
              .find('.nextButton')
              .text('Play Again?');
            quizOver = true;
          }
        }
      } else {
        // quiz is over and clicked the next button (which now displays 'Play Again?'
        quizOver = false;
        $(document)
          .find('.nextButton')
          .text('Next Question');
        resetQuiz();
        displayCurrentQuestion();
        hideScore();
      }
    });
});

// This displays the current question AND the choices
function displayCurrentQuestion() {
  console.log('In display current Question');

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find('.quizContainer > .question');
  var choiceList = $(document).find('.quizContainer > .choiceList');
  var numChoices = questions[currentQuestion].choices.length;

  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList)
    .find('li')
    .remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];
    $(
      '<li><input type="radio" value=' +
      i +
      ' name="dynradio" />' +
      choice +
      '</li>'
    ).appendTo(choiceList);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  answers = 0;
  hideScore();
}

function displayScore() {
  $(document)
    .find('.quizContainer > .result')
    .text('You scored: ' + answers + '! ');
  $(document)
    .find('.quizContainer > .result')
    .show();
}

function hideScore() {
  $(document)
    .find('.result')
    .hide();
}

// This is for new app
// Find out which choice got the highest score.
// If you add more choices and outcomes, you must add the letiable here.
let maxscore = c1score + c2score + c3score + c4score + c5score;

// Display answer corresponding to that choice
let answerbox = document.getElementById('answer');
if (maxscore <= 20) {
  // If user chooses the first choice the most, this outcome will be displayed.
  answerbox.innerHTML = 'You are a Conservative';
}
if (maxscore > 20) {
  // If user chooses the second choice the most, this outcome will be displayed.
  answerbox.innerHTML = 'You are moderate';
}
if (maxscore > 60) {
  // If user chooses the third choice the most, this outcome will be displayed.
  answerbox.innerHTML = 'You are a high risk.';
}
if (maxscore > 80) {
  // If user chooses the fourth choice the most, this outcome will be displayed.
  answerbox.innerHTML = 'You gay';
}
// If you add more choices, you must add another response below.

// program the reset button
function resetAnswer() {
  let answerbox = document.getElementById('answer');
  answerbox.innerHTML = '';
}
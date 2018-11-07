var inputs = document.getElementsByTagName('input');

// progress bar
var inputProgress = document.querySelector('#input-progress');

var progress = document.querySelector('#progress-bar');
// start button quiz

var currentQuestion = 2;

function startQuiz() {
  document.getElementById('question-1').className = 'question';
  var startBtn = document.getElementById('startQuizBtn');
  startBtn.parentNode.removeChild(startBtn);
  inputProgress.style.width = 10 + '%';
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
  hideAnswerButton();

  showQuestion(currentQuestion);
  currentQuestion++;
}

function setAnswerButton() {
  //yes, that's correct. this is my lazy way of input validation without annoyning users
  //(e.g. transition on-click events) on the radio buttons...
  document.getElementById('confirm_answer').className = '';
  document.getElementById('reset').className = '';
}

function hideAnswerButton() {
  document.getElementById('confirm_answer').className = 'invisible';
  document.getElementById('reset').className = 'invisible';
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
    inputProgress.style.width = (currentQuestion / totalQuestions) * 100 + '%';
  } else {
    hideAnswerButton(); //begins the end screen process if id is above total question
    inputProgress.className = 'invisible';
    progress.className = 'invisible';
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
        c2score = c2score + 3;
      }
      if (choices[i].value == 'c3') {
        c3score = c3score + 5;
      }
      if (choices[i].value == 'c4') {
        c4score = c4score + 8;
      }
      if (choices[i].value == 'c5') {
        c5score = c5score + 10;
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
    answerbox.innerHTML = `<p><span class="redd">Very Conservative</span> As a very conservative investor, your portfolio will be invested in the most risk-averse areas such as cash and fixed income securities. This approach offers a high degree of stability and should minimize the chances of substantial short-term volatility. Your main goal is preservation of wealth. The overall return, while not guaranteed, should fall within a narrow range of possibilities. However, particularly for time periods greater than five years, these returns may underperform the returns achievable from a higher-risk approach.</p>`;
    document.getElementById('reset').className = 'show';
  }
  if (maxscore > 20) {
    // If user chooses the second choice the most, this outcome will be displayed.
    answerbox.innerHTML =
      '<p><span class="redd">Conservative</span> As a conservative investor, your portfolio will be invested primarily in risk-averse areas such as cash and fixed-income securities with only a modest exposure to equities. This approach concentrates on stability rather than maximizing return and should limit the chances of substantial short-term volatility. The overall return, while not guaranteed, should fall within a relatively narrow range of possibilities. However, particularly for time periods greater than five years, these returns may underperform the returns achievable from a higher-risk approach. </p>';
    document.getElementById('reset').className = 'show';
  }
  if (maxscore > 40) {
    // If user chooses the third choice the most, this outcome will be displayed.
    answerbox.innerHTML =
      '<p><span class="redd">Moderate</span>As a moderate investor, your portfolio will include investment in equities, balanced by exposure to more risk-averse areas of the market such as cash, fixed-income securities, and real estate. This approach aims to achieve a balance between stability and return but is likely to involve at least some short-term volatility. The overall return is not guaranteed, although the range of possible outcomes should not be extreme. In most circumstances, particularly for time periods greater than five years, these returns should outperform the returns achievable from a more conservative approach but may underperform the returns achievable from a higher-risk approach.</p>';
    document.getElementById('reset').className = 'show';
  }
  if (maxscore > 60) {
    // If user chooses the fourth choice the most, this outcome will be displayed.
    answerbox.innerHTML =
      '<p><span class="redd">Moderately Aggressive</span>As an moderately aggressive investor, your portfolio will be invested primarily in equities. This approach concentrates on achieving a good overall return on your investment while avoiding the most speculative areas of the market. Significant short-term fluctuations in value can be expected. The eventual return for the time period over which you invest could fall within a relatively wide range of possibilities. In most circumstances, particularly for time periods greater than five years, these returns should outperform the returns achievable from a more conservative approach.</p>';
    document.getElementById('reset').className = 'show';
  }

  if (maxscore > 80) {
    // If user chooses the Fifth choice the most, this outcome will be displayed.
    answerbox.innerHTML =
      '<p><span class="redd">Very Aggressive</span>As a very aggressive investor, your portfolio will be invested in equities and will include exposure to more speculative areas of the market. The aim is to maximize return while accepting the possibility of large short-term fluctuations in value and even the possibility of longer-term losses. The eventual return for the time period over which you invest could fall within a wide range of possibilities. In most circumstances, the return should outperform the returns achievable from a more conservative approach.</p>';
    document.getElementById('reset').className = 'show';
  }
  // If you add more choices, you must add another response below.

  document.getElementById('answer').style.display = 'block';

  document.getElementById('loading').style.display = 'none';

  document.getElementById('calc').style.display = 'none';

  inputProgress.style.display = 'none';
  progress.style.display = 'none';
  document.getElementById('table').classList.remove('invisible');

  caclRiskCapacity();
}

// program the reset button
function resetAnswer() {
  window.scrollTo(0, 0);
  window.location.reload();
}

// Scroll Magic Scroll Spy

var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({
  triggerElement: '#startQuizBtn',
  duration: 500
}).addTo(controller);

// change behaviour of controller to animate scroll instead of jump
controller.scrollTo(function(newpos) {
  TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
});

//  bind scroll to anchor links
$(document).on('click', "[href^='#']", function(e) {
  var id = $(this).attr('href');
  if ($(id).length > 0) {
    e.preventDefault();

    // trigger scroll
    controller.scrollTo(id);

    // if supported by the browser we can even update the URL.
  }
});

// table javascript

function caclRiskCapacity() {
  let rc1score = 0;
  let rc2score = 0;
  let rc3score = 0;
  let rc4score = 0;
  let rc5score = 0;

  // get a list of the radio inputs on the page
  let rcchoices = document.getElementsByTagName('input');
  // loop through all the radio inputs
  for (i = 0; i <= 25; i++) {
    // if the radio is checked..
    if (rcchoices[i].checked) {
      // add 1 to that choice's score
      if (rcchoices[i].value == 'c1') {
        rc1score = rc1score + 0;
      }
      if (rcchoices[i].value == 'c2') {
        rc2score = rc2score + 3;
      }
      if (rcchoices[i].value == 'c3') {
        rc3score = rc3score + 5;
      }
      if (rcchoices[i].value == 'c4') {
        rc4score = rc4score + 8;
      }
      if (rcchoices[i].value == 'c5') {
        rc5score = rc5score + 10;
      }
      // If you add more choices and outcomes, you must add another if statement below.
    }
  }

  // Find out which choice got the highest score.
  // If you add more choices and outcomes, you must add the letiable here.
  let maxrcscore = rc1score + rc2score + rc3score + rc4score + rc5score;

  if (maxrcscore <= 10) {
    // If user chooses the first choice the most, this outcome will be displayed.
    let riskCvc = document.getElementById('rcvc');
    riskCvc.classList = 'chosen';
  }
  if (maxrcscore > 10) {
    // If user chooses the second choice the most, this outcome will be displayed.
    let riskCc = document.getElementById('rcc');
    riskCc.classList = 'chosen';
  }
  if (maxrcscore > 20) {
    // If user chooses the third choice the most, this outcome will be displayed.
    let riskCm = document.getElementById('rcm');
    riskCm.classList = 'chosen';
  }
  if (maxrcscore > 30) {
    // If user chooses the fourth choice the most, this outcome will be displayed.
    let riskCma = document.getElementById('rcma');
    riskCma.classList = 'chosen';
  }

  if (maxrcscore > 40) {
    // If user chooses the Fifth choice the most, this outcome will be displayed.
    let riskCva = document.getElementById('rcva');
    riskCva.classList = 'chosen';
  }
}


var quizArray = [
  {
      q:'What kind of statement is used to execute actions base on a trigger or condition?',
      a:'Conditional Statement',
      b:'Fired Event',
      c:'Regular Expression',
      d:'For Loop',
      correctAnswer:'a'
  },
  {
      q:'very useful tool used during development and debugging for printing content to the debugger is?',
      a:'terminal/bash',
      b:'JS',
      c:'CSS',
      d:'Jfor loops',
      correctAnswer:'d'
  },
  {
      q:'What tag is used to define a standard cell inside a table?',
      a:'<h1> to <h6>',
      b:'<footer',
      c:'"<button>',
      d:'<td>',
      correctAnswer:'d'
  },
  {
      q:'What method you can use to convert a content to strings before to save in the local storage?',
      a:'localStorage.setItem()',
      b:'JSON.stringify()',
      c:'JOHN.stringify()',
      d:'I command you to save this thing as string',
      correctAnswer:'b'
  },
  {
      q:'Common data types do not include:',
      a:'booleans',
      b:'alerts',
      c:'numbers',
      d:'strings',
      correctAnswer:'b'
  }
];


var arrayScores = [];

var timeLeft = 75;

var score = 0;

var index = 0;

var stopTimer = false;

var footer = document.querySelector('footer');

var divScreen = document.querySelector('main');

var startScreen = '<div id="start-screen" class="start-screen"><h1>Code Quiz Chalenge</h1><p>This is a code quiz chalenge. Answer the questions before the time runs out. Every time you answer incorrectly you will be penalized by 10 seconds. The seconds remaining after you are done will be your score.</p><button id="start-button" class="hover start-button" type="button">Start</button></div><footer></footer>'

var form;

var endLoop = false;

var highScoresLink = document.getElementById("my-link");

var header = document.querySelector('header');

var timer;


var buttonHandler = function(event) {
 event.preventDefault();
  var target = event.target;
  var button = document.getElementById(target.id);
  if(button.type === "button"){
      if(button.id === "start-button"){
          stopTimer = false;
          timeLeft = 75;
          countDown();
          displayQuestion(index);
          index++;
      }
       else{   
          checkAnswer(button);
              if(index < quizArray.length){
                  displayQuestion(index);
                  index++;
              }
              else {
                  stopTimer = true;
                  score = timeLeft;
                  saveScoreForm(score);
              }
          }
      }
      else if(button.type === "submit"){
          if(button.id === "submit"){
          var check = scoreStorage();
          console.log(check);
              if(check){
          showHighScores();
              }
          }
          if(button.id === "go-back" || button.id === "try-again"){
              endLoop = false;
              index = 0;
              divScreen.innerHTML = startScreen;
          }
          if(button.id === "clean"){
              localStorage.clear();
              showHighScores();
              endLoop = true;
          }
          if(button.id === "my-link"){
              showHighScores();
              stopTimer = true;
              footer.innerHTML = "";
           }
      }
      
      else {
          return false;
      }
}


function countDown(){
  timer = setInterval(function(){
      if(timeLeft<0){
          timeLeft=0;
      }
  document.getElementById('timer').innerHTML = 'Time: ' + timeLeft;
  if(timeLeft <= 0){
      clearInterval(timer);
      footer.innerHTML = "<h1>GAME OVER!</h1>";
      saveScoreForm();
  }
  if(stopTimer === true){
      clearInterval(timer);
  }
 
  timeLeft--;
}, 1000);
}


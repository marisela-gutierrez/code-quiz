
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

function displayQuestion(i){

  btnA =' <button id="a" class="hover button" type="button">'+ quizArray[i].a + '</button>'
  btnB =' <button id="b" class="hover button" type="button">'+ quizArray[i].b + '</button>'
  btnC =' <button id="c" class="hover button" type="button">'+ quizArray[i].c + '</button>'
  btnD =' <button id="d" class="hover button" type="button">'+ quizArray[i].d + '</button>'

 divScreen.innerHTML = '<div id = "start-screen" class="start-screen"><h1>'+ quizArray[i].q + "</h1><ul><li>"+ btnA + "</li><li>"+ btnB + "</li><li>"+ btnC + "</li><li>"+ btnD + "</li></ul></div>";
 a
}

function checkAnswer(answer){

   if(answer.id != quizArray[index-1].correctAnswer){
     timeLeft = timeLeft - 10;
     footer.innerHTML = "<h1>WRONG</h1>";
      
  }
  else if(answer.id === quizArray[index-1].correctAnswer){
      footer.innerHTML = "<h1>CORRECT</h1>";
  }
   
}


function saveScoreForm(num){
  if(score < 1){
      divScreen.innerHTML = '<div id="start-screen" class="start-screen"><h1>LOSER!</h1><button id="try-again" class="hover start-button" type="submit">Try Again</button>';
  }
  else {
  var submitButton = '<button id="submit" class="hover start-button" type="submit" />';
  var name = '<input id ="inicials" type="text" name="name" placeholder="" />'
  divScreen.innerHTML = '<div id = "submit-score" class="start-screen form"><h1>All Done!</h1><h3>Your final Score is '+ num +'!</h3><h3>Enter inicials:'+ name + '</h3>' + submitButton + 'Submit</button></div>' 
  } 
}

var scoreStorage = function (){
  var scoreEl = {
      score:0,
      inicials:"",
  }
  var check;
  var inicials = document.getElementById("inicials").value;
  if(inicials){
  var ini = inicials.toUpperCase();
  scoreEl.score = score;
  scoreEl.inicials = ini;
  arrayScores.push(scoreEl);
  localStorage.setItem("scores",JSON.stringify(arrayScores));
  check = true;
  }
 
  else{
      alert("You forgot to type your inicials!");
      check = false;
  }
  return check;
}


function compare(a, b) {
  var comparison = 0;
  if (a.score < b.score) {
    comparison = 1;
  } else if (a.score > b.score) {
    comparison = -1;
  }
  return comparison;
}


function showHighScores(){
  var goBackButton = '<button id="go-back" class="hover start-button scores-button" type="submit" />';
  var cleanScores = '<button id="clean" class="hover start-button scores-button" type="submit" />';
  var tableScores = '<table><tr><th>Name Inicials</th><th>Score</th></tr>';
  var readScores = localStorage.getItem("scores");
  var parseScores = JSON.parse(readScores);
  
  if (!parseScores){
      tableEls = "<h2>No scores saved!</h2>"
  }
 
  else if(parseScores.length > 1){
  parseScores.sort(compare);
   var tableEls = "";
   parseScores.forEach(element => {
  tableEls = tableEls + "<tr><td>"+ element.inicials + "</td><td>" + element.score + "</td></tr>"  
  });
  }  
  else{
      tableEls = "<tr><td>"+ parseScores[0].inicials + "</td><td>" + parseScores[0].score + "</td></tr>"
  }
  footer.innerHTML = "";
  divScreen.innerHTML = '<div id = "high-scores" class="start-screen"><h1>High Scores</h1></div><div class = "high-scores">'+ tableScores + tableEls + goBackButton + 'Go Back</button>' + cleanScores + 'Clean Scores</button></div>';
}


if(endLoop === false){
  divScreen.addEventListener("click",buttonHandler);
  header.addEventListener("click", buttonHandler);
}
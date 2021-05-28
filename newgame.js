
// if we click on start or reset
var playing;
var score;
var timeremaining;
var action;
var correctAnswer;
var selected;


document.getElementById("startgame").onclick = function() {
    
    if(playing==true) { // if we are playing

        location.reload();  //reloading page
    }
    else { // if we are not playing

        // change mode to playing
        playing = true;

        // set score to zero
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        // timer on
        show("time")
        timeremaining = 60;
        document.getElementById("timevalue").innerHTML = timeremaining;

        // change button to reset
        document.getElementById("startgame").innerHTML = "Reset game";

        hide("gameover");

        startCount();
        showQA();

    }

    for(j=1;j<5;j++){

        document.getElementById("box"+j).onclick = function() {
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                },1000);

                showQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000)
            }
        }
    }

    // Creating functions

    function show(ID){
        document.getElementById(ID).style.display = "block";
    }
    function hide(ID){
        document.getElementById(ID).style.display = "none";
    }

    function stopCount(){
        clearInterval(action);
    }

    function startCount(){
        action = setInterval(function(){
            timeremaining -= 1;
            document.getElementById("timevalue").innerHTML = timeremaining;
            if(timeremaining == 0){
                stopCount();
                show("gameover");
                document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p> Your score is " + score + "</p>"
                playing=false;
            
                hide("time");
                hide("correct");
                hide("wrong");
                document.getElementById("startgame").innerHTML = "Start game"
            }
        },1000);
    }

    function showQA() {
        var x = 1 + Math.round(9*Math.random());
        var y = 1 + Math.round(9*Math.random());
        var done = [0,x+y,x*y,x-y];
        var k = 1 + Math.round(2*Math.random());
        
        correctAnswer = done[k]; 
        if(correctAnswer==x+y) {
            document.getElementById("question").innerHTML = x + "+" + y;
        }
        else if(correctAnswer==x-y) {
            document.getElementById("question").innerHTML = x + "-" + y;
        }
        else{
            document.getElementById("question").innerHTML = x + "×" + y;
        }
        
        
        var correctPosition = 1 + Math.round(3*Math.random());
        document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

        // filling remaining boxes with wrong answers
        var answers = [correctAnswer];

        for(i=1;i<5;i++){
            if(i != correctPosition){
                var wrongAnswer;
                do{
                    wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
                }
                while(answers.indexOf(wrongAnswer)> -1)

                
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);

            }
        }
    }




}

/* 
    if we are playing{
        reload page
        score zero
        time remaianing should start
        start button changes to reset 
    }


    if we are not playing {
        time remaining should disappear
        
    }




*/
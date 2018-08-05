$(document).ready(function() {
    // Creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Play Game</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    // On-click event for start button to begin name
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/assets/images/bird.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 3000);  //end generatewin
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/assets/images/sorry.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    //end generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question
    
    function wait() {
        //ternary operator replacing if/else for generate more questions
    questionCounter < 7 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 30,
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "Apple Computers was founded in what year?", 
    "How old was Steve Jobs when he recieved an internship from Hewlet Packard?", 
    "Where were Steve and his wife Laurene Powell married?", 
    "Steve Wozniak notes that Jobs never learned how to:", 
    "What brand of sneakers was Jobs wearing when he was fired from Apple?", 
    "'Who was the Director of Security At Apple in 2004?", 
    "What did Woz and Jobs sell  to fund Apple's first computer?", 
    "How many iPhones have been sold? " ];

    var answerArray = [
        ["1972", "1974", "1976", "1980"], 
        ["12", "13", "14", "16"], 
        ["Hawaii", "Yosemite National Park", "the Courthouse", "the Grand Canyon"], 
        ["cook", "clean", "code", "drive"], 
        ["Adidas", "New Balance", "Nike", "He wore flip-flops"], 
        ["Bill Gates","Jim Snyder","Johnie Ive","Al Gore"], 
        ["Blue Boxes", "Calculator and Volkswagon", "Atari Code", "Computer Chips"], 
        ["1Million","20Million","50Million","Over 1 Billion"], ];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='assets/images/1976.jpg'>";
    imageArray[1] = "<img class='center-block' src='assets/images/freshman.jpg'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/Yosemite.jpg'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/code.jpg'>";  
    imageArray[4] = "<img class='center-block' src='assets/images/New-Balance.jpg'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/Jim-Snyder.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/calculator.jpg'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/billions.jpg'>"; 

    var correctAnswers = 
    [ "C. 1976", 
    "A. 12", 
    "B. Yosemite National Park", 
    "C. code", 
    "B. New Balance", 
    "B. Jim Snyder", 
    "B. Calculator and Volkswagon", 
    "D. Over 1 Billion"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sounds/btn-click.mp3");
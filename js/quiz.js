var app = {
    getQuiz: function() {
        console.log("Trying to get quiz");
        var url = "https://opentdb.com/api.php?amount=10&type=multiple";
        $.getJSON(url, function(data) { 
            console.log("Got the quiz!");
            console.log(data);

            var fetchQuestion = function(question) {
                console.log(question);
                $("#question").html(question.question);
                var correctOption = Math.floor(Math.random() * 4);
                console.log("Picked to be correct: " + correctOption);
                for (i = 0; i < 4; i++) {
                    if (correctOption == i) {
                        $("#option" + i).html(question.correct_answer);
                    } else {
                        $("#option" + i).html(question.incorrect_answers.pop());                    
                    }
                }
                highlightOption(-1); // Clears selection
            };

            var selectedAnswer = -1;

            var highlightOption = function(selectedIndex) {
                for (i = 0; i < 4; i++) {
                    $("#option" + i).removeClass("selected");
                }
                if (selectedIndex >= 0) {
                    selectedAnswer = selectedIndex; // TODO hacky, refactor
                    $("#option" + selectedIndex).addClass("selected");
                    $("#checkAnswer").show();
                } else {
                    selectedAnswer = -1;
                    $("#checkAnswer").hide();
                }
            };

            $("#option0").click(function() {
                highlightOption(0);
            });
            $("#option1").click(function() {
                console.log("Clicked 1");
                highlightOption(1);
            });
            $("#option2").click(function() {
                console.log("Clicked 2");
                highlightOption(2);
            });
            $("#option3").click(function() {
                console.log("Clicked 3");
                highlightOption(3);
            });

            var currentQuestion = 0;
            fetchQuestion(data.results[currentQuestion]);
            $("#nextQuestion").hide();
            $("#scorecard").html("0 / 10");

            var score = 0;

            $("#checkAnswer").click(function() {
                if (data.results[currentQuestion].correct_answer === $("#option" + selectedAnswer).html()) {
                    score++;
                    $("#scorecard").html(`Correct! ${score} / 10`);
                } else {
                    $("#scorecard").html(`Incorrect! ${score} / 10`);
                }
                $("#nextQuestion").show();
                $("#checkAnswer").hide();
            })

            $("#nextQuestion").click(function() {
                currentQuestion++;
                if (currentQuestion >= 10) {
                    $("#scorecard").html(`Quiz complete. You scored: ${score} / 10. Congratulations!`);
                } else {
                    fetchQuestion(data.results[currentQuestion]);
                    $("#scorecard").html(`${score} / 10`);
                }
                $("#nextQuestion").hide();
            });

        }); 
    },

    refresh: function() {
        $("#quiz").html("");
        this.getQuiz();
    }
};

app.getQuiz();
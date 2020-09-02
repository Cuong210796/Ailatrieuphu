class ui {
    constructor() {

    }
    showScreen(screenName) {

        let screens = document.querySelectorAll('#wrapper > div');
        screens.forEach((screen) => {
            screen.style.display = 'none';
        });

        let currentScreen = document.getElementById(screenName);
        currentScreen.style.display = 'block';
    }

    onStartBtnClick(callback) {
        let startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', callback);
    }

    showQuestion(question) {
        document.getElementById('question').innerHTML = question.question;
        document.getElementById('answer_1').innerHTML = question.answer[0];
        document.getElementById('answer_2').innerHTML = question.answer[1];
        document.getElementById('answer_3').innerHTML = question.answer[2];
        document.getElementById('answer_4').innerHTML = question.answer[3];
    }

    onClickAnswer(callback) {
            clickBTN();
            document.getElementById('answer_1').addEventListener('click', () => callback(0));
            document.getElementById('answer_2').addEventListener('click', () => callback(1));
            document.getElementById('answer_3').addEventListener('click', () => callback(2));
            document.getElementById('answer_4').addEventListener('click', () => callback(3));
        }
        //đổi màu khi click đáp án
    setSelectedAnswer(answer) {
        let answerIndex = answer + 1;
        let answerDiv = document.getElementById('answer_' + answerIndex);
        answerDiv.style.backgroundColor = '#FFA500';
    }

    //reset toàn bộ
    resetAnswerStyle() {
        for (let i = 1; i <= 4; i++) {
            document.getElementById('answer_' + i).style.backgroundColor = '#040404'
        }
    }


    showResult(currentAnswer, correctAnswer) {
        let currentAnswerIndex = currentAnswer + 1;
        let correctAnswerIndex = correctAnswer + 1;
        //trả màu đúng sai
        document.getElementById('answer_' + currentAnswerIndex).style.backgroundColor = 'red'
        document.getElementById('answer_' + correctAnswerIndex).style.backgroundColor = 'green'
    }

}
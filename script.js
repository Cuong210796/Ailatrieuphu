const questions = [{
        question: 'Đâu là đáp án đúng của bài toán 1 + 1 = ?',
        answer: [
            'A . 2',
            'B . 3',
            'C . 9',
            'D .  0',
        ],
        correct: 0
    },
    {
        question: 'Vua nào đặt nhiều niên hiệu nhất lịch sử nước ta ?',
        answer: [
            'A . Trần Thánh Tông',
            'B . Quang Trung',
            'C . Lê Lợi',
            'D . Lý Nhân Tông',
        ],
        correct: 3
    },
];



class altp {
    constructor() {
        this.ui = new ui();
        this.ui.showScreen('welcomeScreen');
        this.currentQuestion = 0;
        this.currentAnswer = null;

        this.bgSound = new sound('bg.mp3');
        this.startSound = new sound('start.mp3');
        this.waitAnswerSound = new sound('wait_answer.mp3');
        this.questionBgSound = new sound('question_bg.mp3');
        this.correctSound = new sound('correct.mp3');
        this.wrongSound = new sound('wrong.mp3');

        this.ui.onStartBtnClick(() => {
            this.start();
        });

    }
    start() {
        this.ui.showScreen('questionScreen');
        this.ui.resetAnswerStyle();

        this.startSound.start(() => {
            this.questionBgSound.start();
        });
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.ui.onClickAnswer((answer) => {
            this.currentAnswer = answer;
            this.ui.setSelectedAnswer(answer);
            this.questionBgSound.stop();
            this.waitAnswerSound.start(() => {
                this.checkAnswer();
            })
            console.log(answer)
        });
    }

    checkAnswer() {
        this.ui.showResult(this.currentAnswer, questions[this.currentQuestion].correct);
        if (this.currentAnswer == questions[this.currentQuestion].correct) {
            // this.correctSound.start();
            this.currentQuestion++;
            if (this.currentQuestion == questions.length) {
                this.youwin();
                return;
            }
            this.correctSound.start(() => {
                this.start();
            })
        } else {
            this.wrongSound.start(() => {
                this.reset();
            });
            // if (startTimer == 0) {
            //     this.reset();
            // }
        }
    }

    youwin() {
        this.currentQuestion = 0;
        this.ui.showScreen('youWin');
        this.ui.resetAnswerStyle();
        this.bgSound.stop();
        this.startSound.start(() => {
            this.questionBgSound.start();
        });
    }

    reset() {
        this.currentQuestion = 0;
        this.ui.showScreen('welcomeScreen');
        this.ui.resetAnswerStyle();
        this.bgSound.stop();
        this.startSound.start(() => {
            this.questionBgSound.start();
        });
    }

    // countDownTime() {
    //     return setInterval(() => {
    //         this.timeRemaining--;
    //         document.getElementById('time-remaining').value = this.timeRemaining;
    //         if (this.timeRemaining === 0) {
    //             this.gameOver();
    //         }
    //     }, 1000);
    // }

    // gameOver() {
    //     clearInterval(this.countDown);
    //     this.audioController.gameOverSound();
    //     document.getElementById('game-over').classList.add('visible');
    // }

}

var game = new altp();

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function() {
    var fiveMinutes = 60 * 0.5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};
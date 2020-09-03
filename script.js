const questions = [{
        question: 'Điền vào chỗ ... : Cây ngay không sợ chết ...',
        answer: [
            'A . Ngồi',
            'B . Đứng',
            'C . Sớm',
            'D . Muộn',
        ],
        correct: 1
    },
    {
        question: 'Trong các số do dưới đây, số đo nào bằng 25,08 km ?',
        answer: [
            'A . 2508000m',
            'B . 2508m',
            'C . 0.2508m',
            'D . 25080m',
        ],
        correct: 3
    },
    {
        question: 'Đơn vị đo dung lượng bộ nhớ nào lớn nhất ?',
        answer: [
            'A . GB',
            'B . TB',
            'C . MB',
            'D . KB',
        ],
        correct: 1
    }, {
        question: 'Điền vào chỗ ... : Mạnh vì..., bạo vì tiền',
        answer: [
            'A . Gạo',
            'B . Bạn',
            'C . Vợ',
            'D . Ba',
        ],
        correct: 0
    },
    {
        question: 'Sat trong tiếng Anh là thứ mấy trong tuần ?',
        answer: [
            'A . Thứ ba',
            'B . Thứ tư',
            'C . Thứ sáu',
            'D . Thứ bảy',
        ],
        correct: 3
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
    {
        question: 'Người ta thường gọi quốc gia nào là đất nước mặt trời mọc ?',
        answer: [
            'A . Hàn Quốc',
            'B . Nhật Bản',
            'C . Italia',
            'D . Pháp',
        ],
        correct: 1
    },
    {
        question: 'Tác phẩm bắt đầu bằng tiếng trống thu không ?',
        answer: [
            'A . Hai đứa trẻ - Thạch Lam',
            'B . Tắt đèn - Ngô Tất Tố',
            'C . Đôi lứa xứng đôi - Nam Cao',
            'D . Nỗi buồn chiến tranh - Bảo Ninh',
        ],
        correct: 0
    },
    {
        question: 'Ngôi đền nào của Ấn Độ là biểu tượng tình yêu vĩnh cửu ?',
        answer: [
            'A . Ranakpur',
            'B . Ramanathaswamy',
            'C . Mahabodhi',
            'D . Tạ Mahal',
        ],
        correct: 3
    },
    {
        question: 'Lớp phủ bên ngoài lá có tác dụng hạn chế thoát hơi nước là ?',
        answer: [
            'A . Inox',
            'B . Kẽm',
            'C . Cutin',
            'D . Bạc',
        ],
        correct: 2
    },
    {
        question: 'Câu nói: "Đầu tôi chưa rơi xuống đất, xin bệ hạ đừng lo" là của ai ?',
        answer: [
            'A . Trần Quốc Toản',
            'B . Trần Thủ Độ',
            'C . Trần Quốc Tuấn',
            'D . Nguyễn Trãi',
        ],
        correct: 1
    },
    {
        question: 'Đất nước nào là quê hương của ông già tuyết ?',
        answer: [
            'A . Phần Lan',
            'B . Thụy Điển',
            'C . Pháp',
            'D . Hà Lan',
        ],
        correct: 0
    },
    {
        question: 'Lần đầu tiên nước ta dùng bộc phá 1000 kg thuốc nổ đánh giặc là ở đâu ?',
        answer: [
            'A . Tây Nguyên',
            'B . Trường Sơn',
            'C . Tây Bắc',
            'D . Điện Biên Phủ',
        ],
        correct: 3
    },
    {
        question: 'Sau chiến tranh thế giới 2, phong trào giải phóng dân tộc nổi lên mạnh nhất ở đâu ?',
        answer: [
            'A . Châu Á',
            'B . Châu Âu',
            'C . Châu Phi',
            'D . Châu Đại Dương',
        ],
        correct: 3
    },
    {
        question: 'Phim hoạt hình đầu tiên được công chiếu vào thời gian nào ?',
        answer: [
            'A . 28-10-1892',
            'B . 21-2-1873',
            'C . 1-6-1912',
            'D . 12-4-1931',
        ],
        correct: 0
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
}

var game = new altp();

function startTimer(duration, display) {
    console.log(duration);
    var timer = duration,
        minutes, seconds;
    var count = game.currentQuestion;
    var id = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        timer--;
        if (game.currentQuestion > count) {
            clearInterval(id);
        }
        if (timer < 0) {
            timer = 0;
            game.wrongSound.start(() => {
                game.reset();
            });
            clearInterval(id);
        }
    }, 1000);
}



var clickBTN = function() {
    var fiveMinutes = 60 * 0.5;
    var display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};
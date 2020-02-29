import React from "react";
import Answers from "Answers";
import Popup from "Popup";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      total: data.length,
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "flex"
    };
  }

  pushData(currentQuestion) {
    this.setState({
      question: data[currentQuestion].question,
      answers: [
        data[currentQuestion].answers[0],
        data[currentQuestion].answers[1],
        data[currentQuestion].answers[2],
        data[currentQuestion].answers[3]
      ],
      correct: data[currentQuestion].correct_answer,
      currentQuestion: this.state.currentQuestion + 1
    });
  }

  componentWillMount() {
    let { currentQuestion } = this.state;
    this.pushData(currentQuestion);
  }

  nextQuestion = () => {
    let { currentQuestion, total, score } = this.state;

    if (currentQuestion === total) {
      this.setState({
        displayPopup: "flex"
      });
    } else {
      this.pushData(currentQuestion);
      this.setState({
        showButton: false,
        questionAnswered: false
      });
    }
  };

  handleShowButton = () => {
    this.setState({
      showButton: true,
      questionAnswered: true
    });
  };

  handleStartQuiz = () => {
    this.setState({
      displayPopup: "none",
      currentQuestion: 1
    });
  };

  handleIncreaseScore = () => {
    this.setState({
      score: this.state.score + 1
    });
  };

  render() {
    let {
      currentQuestion,
      total,
      question,
      answers,
      correct_answer,
      showButton,
      questionAnswered,
      displayPopup,
      score
    } = this.state;

    return (
      <div className="container">
        <Popup
          style={{ display: displayPopup }}
          score={score}
          total={total}
          startQuiz={this.handleStartQuiz}
        />

        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <div id="question">
              <h4>
                Question {currentQuestion}/{total}
              </h4>
              <p>{question}</p>
            </div>
            <Answers
              answers={answers}
              correct={correct_answer}
              showButton={this.handleShowButton}
              isAnswered={questionAnswered}
              increaseScore={this.handleIncreaseScore}
            />
            <div id="submit">
              {showButton ? (
                <button className="fancy-btn" onClick={this.nextQuestion}>
                  {currentQuestion === total ? "Finish quiz" : "Next question"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <footer>Hope you're having fun</footer>
      </div>
    );
  }
}

export default Main;

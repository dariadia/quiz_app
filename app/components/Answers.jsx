import React from "react";
import axios from "axios";

const API =
  "https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple";
const DEFAULT_QUERY = "redux";

const fetchAnswers = url => Component =>
  class Answers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: false,
        error: null,

        isAnswered: false,
        classNames: ["", "", "", ""]
      };
    }
    componentDidMount() {
      this.setState({ isLoading: true });
      axios
        .get(url)
        .then(result =>
          this.setState({
            data: result.data,
            isLoading: false
          })
        )
        .catch(error =>
          this.setState({
            error,
            isLoading: false
          })
        );
    }

    checkAnswer = e => {
      let { isAnswered } = this.props;

      if (!isAnswered) {
        let element = e.currentTarget;
        let { correct, increaseScore } = this.props;
        let answer = Number(element.dataset.id);
        let updatedClassNames = this.state.classNames;

        if (answer === correct) {
          updatedClassNames[answer - 1] = "right";
          increaseScore();
        } else {
          updatedClassNames[answer - 1] = "wrong";
        }

        this.setState({
          classNames: updatedClassNames
        });

        this.props.showButton();
      }
    };

    shouldComponentUpdate() {
      this.setState({
        classNames: ["", "", "", ""]
      });
      return true;
    }

    render() {
      let { answers } = this.props;
      let { classNames } = this.state;

      let transition = {
        transitionName: "example",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      };

      return (
        <div id="answers">
          <ul>
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span> <p>{answers[0]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span> <p>{answers[1]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span> <p>{answers[2]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span> <p>{answers[3]}</p>
            </li>
          </ul>
        </div>
      );
    }
  };

export default Answers;

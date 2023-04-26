import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { score } from '../redux/actions';

class Questions extends React.Component {
  state = {
    array: [],
    verify: false,
    countdown: 30,
    disable: false,
  };

  componentDidMount() {
    const { objQuestions } = this.props;

    const incorretAnswers = objQuestions.incorrect_answers;
    const correctAnswer = objQuestions.correct_answer;
    const arrayAnswers = [...incorretAnswers, correctAnswer];

    for (let i = arrayAnswers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayAnswers[i], arrayAnswers[j]] = [arrayAnswers[j], arrayAnswers[i]];
    }
    this.setState({
      array: arrayAnswers,
      verify: true,
    });
    this.countdown();
  }

  countdown = () => {
    const time = 1000;
    this.timer = setInterval(() => {
      const { countdown } = this.state;
      if (countdown === 0) {
        this.transition();
        this.setState({
          disable: true,
        });
      } else {
        this.setState({ countdown: countdown - 1 });
      }
    }, time);
  };

  verificarResposta = ({ target }) => {
    this.transition();
    const { objQuestions } = this.props;
    const respostas = document.getElementsByTagName('button');
    for (let i = 0; i < respostas.length; i += 1) {
      const resposta = respostas[i];
      if (objQuestions.correct_answer === resposta.innerHTML
        && resposta.getAttribute('data-testid') === 'correct-answer') {
        resposta.classList.add('resposta-correta');
      } else {
        resposta.classList.add('resposta-incorreta');
      }
    }

    if (objQuestions.correct_answer === target.innerHTML) {
      const { countdown } = this.state;
      const DEZ = 10;
      const HARD = 3;
      const MEDIUM = 2;
      const EASY = 1;
      const { dispatch } = this.props;
      this.setState({ disable: true });
      switch (objQuestions.difficulty) {
      case 'hard':
        return dispatch(score(DEZ + (countdown * HARD)));
      case 'medium':
        return dispatch(score(DEZ + (countdown * MEDIUM)));
      default:
        return dispatch(score(DEZ + (countdown * EASY)));
      }
    } else {
      this.setState({ disable: true });
    }
  };

  handleNext = () => {
    const { callback } = this.props;
    const btnsQuestions = document.getElementsByTagName('button');
    for (let index = 0; index < btnsQuestions.length; index += 1) {
      btnsQuestions[index].removeAttribute('class');
    }
    const obj = callback();
    if (obj) {
      const incorretAnswers = obj.incorrect_answers;
      const correctAnswer = obj.correct_answer;
      const arrayAnswers = [...incorretAnswers, correctAnswer];

      for (let i = arrayAnswers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayAnswers[i], arrayAnswers[j]] = [arrayAnswers[j], arrayAnswers[i]];
      }
      this.setState({
        disable: false,
        array: arrayAnswers,
        verify: true,
        countdown: 30,
      });
      this.transition();
      this.countdown();
    }
  };

  transition() {
    clearInterval(this.timer);
  }

  // tick() {
  //   const { countdown } = this.state;
  //   if (countdown === 0) {
  //     this.transition();
  //     this.setState({
  //       disable: true,
  //     });
  //   } else {
  //     this.setState({ countdown: countdown - 1 });
  //   }
  // }

  render() {
    const { array, verify, countdown, disable } = this.state;
    const { objQuestions } = this.props;

    return (
      <div>
        <p data-testid="paragraph">{ countdown }</p>
        { array.length > 0
        && (
          <div>
            <h1 data-testid="question-category">{objQuestions.category}</h1>
            <p
              data-testid="question-text"
              dangerouslySetInnerHTML={ {
                __html: objQuestions.question,
              } }
            />
            <div data-testid="answer-options">
              { verify
            && (
              array.map((element, index) => (element === objQuestions.correct_answer
                ? (
                  <button
                    disabled={ disable }
                    data-testid="correct-answer"
                    key={ index }
                    onClick={ this.verificarResposta }
                  >
                    {element}
                  </button>)
                : (
                  <button
                    disabled={ disable }
                    data-testid={ `wrong-answer${index}` }
                    key={ index }
                    onClick={ this.verificarResposta }
                  >
                    {element}
                  </button>
                )))
            )}
            </div>
          </div>
        )}
        { disable
        && (
          <button
            onClick={ this.handleNext }
            data-testid="btn-next"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  objQuestions: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

export default connect()(Questions);

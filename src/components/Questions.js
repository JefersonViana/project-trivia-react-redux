import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';

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
    this.timer = setInterval(() => this.tick(), time);
  };

  verificarResposta = () => {
    const { objQuestions } = this.props;
    const respostas = document.getElementsByTagName('button');
    // Verificar cada resposta para determinar se está correta ou incorreta
    for (let i = 0; i < respostas.length; i += 1) {
      const resposta = respostas[i];
      if (objQuestions.correct_answer === resposta.innerHTML
        && resposta.getAttribute('data-testid') === 'correct-answer') {
        // Resposta correta
        resposta.classList.add('resposta-correta');
      } else {
        // Resposta incorreta
        resposta.classList.add('resposta-incorreta');
      }
    }
  };

  transition() {
    clearInterval(this.timer);
  }

  tick() {
    const { countdown } = this.state;
    if (countdown === 0) {
      this.transition();
      this.setState({
        disable: true,
      });
    } else {
      this.setState({ countdown: countdown - 1 });
    }
  }

  render() {
    const { array, verify, countdown, disable } = this.state;
    const { objQuestions } = this.props;

    return (
      <div>
        <p>{ countdown }</p>
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
      </div>
    );
  }
}

Questions.propTypes = {
  objQuestions: PropTypes.shape({
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(Questions);

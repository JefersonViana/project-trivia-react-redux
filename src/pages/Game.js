import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Questions from '../components/Questions';

class Game extends React.Component {
  state = {
    results: [],
    nextQuestion: 0,
  };

  componentDidMount() {
    this.requestApi();
  }

  handleNextQuestions = () => {
    const { nextQuestion, results } = this.state;
    const FIX = 4;
    if (nextQuestion === FIX) {
      const { history } = this.props;
      history.push('/feedback');
      return;
    }
    this.setState((prevState) => ({
      nextQuestion: prevState.nextQuestion + 1,
    }));
    return results[nextQuestion + 1];
  };

  requestApi = async () => {
    const { history } = this.props;
    await fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.results.length === 0) {
          localStorage.clear();
          history.push('/');
        } else {
          this.setState({
            results: json.results,
          });
        }
      });
  };

  render() {
    const { results, nextQuestion } = this.state;
    return (
      <>
        <Header />
        { results.length > 0
        && (
          <Questions
            objQuestions={ results[nextQuestion] }
            callback={ this.handleNextQuestions }
          />
        )}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;

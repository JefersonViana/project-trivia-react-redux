import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  funcao = (name, score, gravatarEmail, assertions) => {
    const objPlayers = JSON.parse(localStorage.getItem('players'));
    if (objPlayers.length === 0) {
      localStorage.setItem(
        'players',
        JSON.stringify([
          {
            name,
            score,
            gravatarEmail,
            gravatarImg: localStorage.getItem('link'),
            assertions,
          },
        ]),
      );
    } else {
      localStorage.setItem(
        'players',
        JSON.stringify([
          ...objPlayers,
          {
            name,
            score,
            gravatarEmail,
            gravatarImg: localStorage.getItem('link'),
            assertions,
          },
        ]),
      );
    }
  };

  handleNextQuestions = () => {
    const { nextQuestion, results } = this.state;
    const FIX = 4;
    if (nextQuestion === FIX) {
      const { history, name, score, gravatarEmail, assertions } = this.props;
      this.funcao(name, score, gravatarEmail, assertions);
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
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Game);

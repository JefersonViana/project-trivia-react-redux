import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Questions from '../components/Questions';

class Game extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {
    this.requestApi();
  }

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
    const { results } = this.state;
    return (
      <>
        <Header />
        { results.length > 0
        && (
          <Questions objQuestions={ results[0] } />
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

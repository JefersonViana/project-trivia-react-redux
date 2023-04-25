import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const players = JSON.parse(localStorage.getItem('players')).sort((a, b) => {
      if (Number(a.score) < Number(b.score)) {
        return 1;
      }
      const NEGATIVO = -1;
      if (Number(a.score) > Number(b.score)) {
        return NEGATIVO;
      }
      return 0;
    });
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {players.map((player, index) => (
          <div key={ player.name }>
            <img src={ player.gravatarImg } alt={ player.name } />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          onClick={ () => {
            history.push('/');
          } }
          data-testid="btn-go-home"
        >
          Play Again

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default Ranking;

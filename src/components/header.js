import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, nome, score } = this.props;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          data-testid="header-profile-picture"
          alt="Profile"
        />
        <div data-testid="header-profile-picture">{email}</div>
        <div data-testid="header-player-name">{nome}</div>
        <div data-testid="header-score">{score}</div>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  nome: PropTypes,
}.isRequired;
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nome: state.player.name,
  score: state.player.score,
});
export default connect(mapStateToProps)(Header);

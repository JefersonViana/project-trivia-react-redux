import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, nome } = this.props;
    return (
      <div>
        <img src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc" data-testid="header-profile-picture" alt="Profile" />
        <div data-testid="header-profile-picture">{email}</div>
        <div data-testid="header-player-name">{nome}</div>
        <div data-testid="header-score">0</div>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  nome: PropTypes,
}.isRequired;
const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.name,
});
export default connect(mapStateToProps)(Header);

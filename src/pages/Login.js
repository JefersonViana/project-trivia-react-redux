import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { profile } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    nome: '',
  };

  onChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => localStorage.setItem('token', json.token));
    const { history, dispatch } = this.props;
    const { email, nome } = this.state;
    dispatch(profile(email, nome));
    history.push('/game');
  };

  handlerSetting = () => {
    const { history } = this.props;
    history.push('/setting');
  };

  render() {
    const { email, nome } = this.state;
    const disabledEmail = !email.includes('@') && !email.includes('.com');
    const disabledName = !nome.length > 0;

    return (

      <form>
        <label>
          <input
            type="text"
            placeholder="Email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.onChange }
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ this.onChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
          disabled={ disabledEmail || disabledName }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handlerSetting }
        >
          Configurações
        </button>
      </form>

    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);

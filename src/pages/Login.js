import React from 'react';

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
            data-testid="input-player-email"
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
          // onClick={}
          disabled={ disabledEmail || disabledName }
        >
          Play
        </button>
      </form>

    );
  }
}

export default Login;

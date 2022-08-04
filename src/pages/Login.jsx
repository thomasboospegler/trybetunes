import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

export default class Login extends Component {
  render() {
    const { userName, onChange, name, onSubmit } = this.props;
    const userMinLength = 3;
    const isDisable = userName.length < userMinLength;
    return (
      <div data-testid="page-login" className="page-login">
        <img src="logo.png" alt="logo" />
        <div>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            name={ name }
            value={ userName }
            onChange={ onChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisable }
            onClick={ onSubmit }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

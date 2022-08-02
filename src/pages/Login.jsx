import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const { userName, onChange, name, onSubmit } = this.props;
    const userMinLength = 3;
    const isDisable = userName.length < userMinLength;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
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
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

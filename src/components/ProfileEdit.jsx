import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    description: '',
    email: '',
    image: '',
    name: '',
    loading: false,
    submited: false,
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userInfo = await getUser();
      const { description, email, image, name } = userInfo;
      this.setState({
        loading: false,
        description,
        email,
        image,
        name,
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { description, email, image, name } = this.state;
    const user = { description, email, image, name };
    updateUser(user);
    this.setState({ submited: true });
  }

  render() {
    const { description, email, image, name, loading, submited } = this.state;

    const userNameCheck = name.length > 0;
    const userEmailCheck = email.length > 0;
    const userDescriptionCheck = description.length > 0;
    const userImageCheck = image.length > 0;

    const isDisable = userNameCheck
      && userEmailCheck
      && userDescriptionCheck
      && userImageCheck;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { submited && <Redirect to="/profile" /> }
        { !loading ? (
          <section>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <label htmlFor="edit-input-image">
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                value={ image }
                id="edit-input-image"
                onChange={ this.handleChange }
              />
            </label>
            <h4>Nome:</h4>
            <label htmlFor="edit-input-name">
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                id="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <h4>E-mail</h4>
            <label htmlFor="edit-input-email">
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                value={ email }
                id="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <h4>Descrição</h4>
            <label htmlFor="edit-input-description">
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                value={ description }
                id="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="submit"
              disabled={ !isDisable }
              onClick={ this.handleSubmit }
            >
              Salvar
            </button>
          </section>
        ) : <Loading /> }
      </div>
    );
  }
}

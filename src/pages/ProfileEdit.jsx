import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/ProfileEdit.css';

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
          <section className="profileEdit-page">
            <div className="image-section">
              <img data-testid="profile-image" src={ image } alt={ name } />
              <label htmlFor="edit-input-image">
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  placeholder="Insira um link"
                  value={ image }
                  id="edit-input-image"
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="info-section">
              <h4>Nome:</h4>
              <p>Fique a vontade para user seu nome social</p>
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
            </div>
            <div className="info-section">
              <h4>E-mail</h4>
              <p>Escolha um email que consulte diariamente</p>
              <label htmlFor="edit-input-email">
                <input
                  data-testid="edit-input-email"
                  type="text"
                  name="email"
                  value={ email }
                  placeholder="usuario@usuario.com.br"
                  id="edit-input-email"
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="info-section">
              <h4>Descrição</h4>
              <label htmlFor="edit-input-description">
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  placeholder="Sobre mim"
                  value={ description }
                  id="edit-input-description"
                  onChange={ this.handleChange }
                />
              </label>
            </div>
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

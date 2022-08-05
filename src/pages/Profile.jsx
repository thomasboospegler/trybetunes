import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/Profile.css';

export default class Profile extends Component {
  state = {
    description: '',
    email: '',
    image: '',
    name: '',
    loading: false,
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userInfo = await getUser();
      const { description, email, image, name } = userInfo;
      this.setState({
        description,
        email,
        image: image || 'https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg',
        name,
        loading: false,
      });
    });
  }

  render() {
    const { description, email, image, name, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { !loading ? (
          <section className="profile-page">
            <div className="imagebutton-section">
              <img data-testid="profile-image" src={ image } alt={ name } />
              <Link to="/profile/edit"><button type="submit">Editar perfil</button></Link>
            </div>
            <div className="info-section">
              <h4>Nome:</h4>
              <p>{ name }</p>
            </div>
            <div className="info-section">
              <h4>E-mail</h4>
              <p>{ email }</p>
            </div>
            <div className="info-section">
              <h4>Descrição</h4>
              <p>{ description }</p>
            </div>
          </section>
        ) : <Loading /> }
      </div>
    );
  }
}

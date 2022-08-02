import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

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
        image,
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
          <section>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit"><button type="submit">Editar perfil</button></Link>
            <h4>Nome:</h4>
            <p>{ name }</p>
            <h4>E-mail</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
          </section>
        ) : <Loading /> }
      </div>
    );
  }
}

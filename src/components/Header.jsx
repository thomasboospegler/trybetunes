import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

export default class Header extends Component {
  state = {
    loading: false,
    name: '',
    image: '',
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const result = await getUser();
    this.setState({
      loading: true,
      name: result.name,
      image: result.image,
    });
  }

  render() {
    const { loading, name, image } = this.state;
    return (
      loading ? (
        <header data-testid="header-component">
          <section className="header-section">
            <img src="/LogoWhithe.png" alt="Logo" />
            <div data-testid="header-user-name">
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="user-name"
              >
                <img src={ image || 'https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg' } alt="Perfil" />
                <p>{ name }</p>
              </Link>
            </div>
          </section>
          <section className="nav-bar-section">
            <div>
              <Link
                to="/search"
                className="link"
                data-testid="link-to-search"
              >
                Search
              </Link>
            </div>
            <div className="link-mid">
              <Link
                to="/favorites"
                className="link"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
            </div>
            <div>
              <Link
                to="/profile"
                className="link"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </div>
          </section>
        </header>
      ) : <Loading />
    );
  }
}

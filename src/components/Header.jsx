import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    loading: false,
    name: '',
  }

  handleGetUser = async () => {
    const result = await getUser();
    this.setState({
      loading: true,
      name: result.name,
    });
    return result.name;
  }

  render() {
    this.handleGetUser();
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <>
            <h1>TrybeTunes</h1>
            <div data-testid="header-user-name">
              { name }
            </div>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          </>
        ) : <Loading /> }
      </header>
    );
  }
}

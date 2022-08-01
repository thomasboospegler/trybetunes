import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  state = {
    artist: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    const isDisable = artist.length < 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            value={ artist }
            type="text"
            name="artist"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisable }
          >
            Procurar
          </button>
        </div>
      </div>
    );
  }
}

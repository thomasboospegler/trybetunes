import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

export default class Search extends Component {
  state = {
    artist: '',
    savedArtist: '',
    loading: false,
    albums: [],
    notExistMssg: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      savedArtist: artist,
    }, async () => {
      const result = await searchAlbumsAPI(artist);
      const notExistMssg = 'Nenhum álbum foi encontrado';
      this.setState({
        loading: false,
        artist: '',
        albums: result,
        notExistMssg,
      });
    });
  }

  render() {
    const { artist, loading, albums, savedArtist, notExistMssg } = this.state;
    const isDisable = artist.length < 2;
    const albumsList = (
      albums.length > 0 ? (
        <div className="albumsList-container">
          <h3>
            Resultado de álbuns de:
            {' '}
            {savedArtist}
          </h3>
          <div className="albumsList">
            {albums.map((album) => (
              <Link
                className="link"
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <div className="album">
                  <img src={ album.artworkUrl100 } alt="Cover" />
                  <h4>{ album.collectionName }</h4>
                  <p>{ album.artistName }</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (<div>{ notExistMssg }</div>));

    return (
      <div data-testid="page-search">
        <Header />
        <section className="search-bar-section">
          <input
            placeholder="Nome do artista"
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
            onClick={ this.handleSubmit }
          >
            Procurar
          </button>
        </section>
        { !loading ? albumsList : <Loading /> }
      </div>
    );
  }
}

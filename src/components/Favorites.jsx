import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    loading: false,
    favSongsList: [],
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const songsList = await getFavoriteSongs();
      this.setState({
        favSongsList: songsList,
        loading: false,
      });
    });
  }

  handleChange = (song) => {
    this.setState({
      loading: true,
    }, async () => {
      const { favSongsList } = this.state;
      await removeSong(song);
      const newSongList = favSongsList
        .filter((music) => music.trackId !== song.trackId);
      return this.setState({
        loading: false,
        favSongsList: newSongList,
      });
    });
  }

  render() {
    const { favSongsList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { !loading ? (
          favSongsList.map((song) => {
            const { trackName, previewUrl, trackId } = song;
            return (
              <div key={ trackId }>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor={ `checkbox-music-${trackId}` }>
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    id={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    checked={ favSongsList.some((music) => music.trackId === trackId) }
                    onChange={ () => this.handleChange(song) }
                  />
                </label>
              </div>
            );
          })
        ) : <Loading /> }
      </div>
    );
  }
}

import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/Favorite.css';

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
      <section data-testid="page-favorites">
        <Header />
        <div className="page-favorites">
          <div>
            { !loading ? (
              favSongsList.map((song) => {
                const { trackName, previewUrl, trackId, artworkUrl100 } = song;
                const verifyCheckbox = favSongsList
                  .some((music) => music.trackId === trackId);
                return (
                  <div key={ trackId } className="song-favorites">
                    <img src={ artworkUrl100 } alt="Cover" />
                    <p>{ trackName }</p>
                    <audio data-testid="audio-component" src={ previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label htmlFor={ `checkbox-music-${trackId}` }>
                      { verifyCheckbox
                        ? <span className="checked">♥</span>
                        : <span className="default">♡</span>}
                      <input
                        data-testid={ `checkbox-music-${trackId}` }
                        id={ `checkbox-music-${trackId}` }
                        type="checkbox"
                        checked={ favSongsList
                          .some((music) => music.trackId === trackId) }
                        onChange={ () => this.handleChange(song) }
                      />
                    </label>
                  </div>
                );
              })
            ) : <Loading /> }
          </div>
        </div>
      </section>
    );
  }
}

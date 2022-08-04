import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/MusicCard.css';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  async componentDidMount() {
    const favList = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favList,
    });
  }

  handleChange = (song) => {
    this.setState({
      loading: true,
    }, async () => {
      const { favoriteSongs } = this.state;
      if (favoriteSongs.some((music) => music.trackId === song.trackId)) {
        await removeSong(song);
        const newSongList = favoriteSongs
          .filter((music) => music.trackId !== song.trackId);
        return this.setState({
          loading: false,
          favoriteSongs: newSongList,
        });
      }
      await addSong(song);
      this.setState({
        loading: false,
        favoriteSongs: [...favoriteSongs, song],
      });
    });
  }

  render() {
    const { songsList } = this.props;
    const { loading, favoriteSongs } = this.state;
    return (
      !loading ? (
        songsList.map((song) => {
          const { trackName, previewUrl, trackId } = song;
          const verifyCheckbox = favoriteSongs.some((music) => music.trackId === trackId);
          return (
            <div key={ trackId } className="song">
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
                  checked={ favoriteSongs.some((music) => music.trackId === trackId) }
                  onChange={ () => this.handleChange(song) }
                />
              </label>
            </div>
          );
        })) : <Loading />
    );
  }
}

MusicCard.propTypes = {
  songsList: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired,
  ).isRequired,
};

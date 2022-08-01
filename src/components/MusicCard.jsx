import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  handleChange = (song) => {
    const { favoriteSongs } = this.state;
    this.setState({
      loading: true,
      favoriteSongs: [...favoriteSongs, song],
    }, async () => {
      console.log(song);
      await addSong(song);
      this.setState({
        loading: false,
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
      artistId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

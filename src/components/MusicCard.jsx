import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
      await addSong(song);
      const { favoriteSongs } = this.state;
      this.setState({
        loading: false,
        favoriteSongs: [...favoriteSongs, song],
      });
    });
  }

  render() {
    const { songsList } = this.props;
    const { loading, favoriteSongs } = this.state;
    console.log(loading);
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

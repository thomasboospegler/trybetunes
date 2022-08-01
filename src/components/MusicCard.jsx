import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { songsList } = this.props;
    return (
      songsList.map(({ trackName, previewUrl }, index) => (
        <div key={ index }>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      ))
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

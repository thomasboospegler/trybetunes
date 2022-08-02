import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    songsList: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      songsList: result,
    });
  }

  render() {
    const { songsList, favSongsList } = this.state;
    const filteredSongsList = songsList.filter((_song, index) => index > 0);
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          { songsList.length > 0 && (
            <>
              <img src={ songsList[0].artworkUrl100 } alt="" />
              <p data-testid="album-name">{ songsList[0].collectionName }</p>
              <p data-testid="artist-name">{ songsList[0].artistName }</p>
            </>
          )}
        </section>
        <section>
          <MusicCard
            songsList={ filteredSongsList }
            favoriteSongs={ favSongsList }
          />
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

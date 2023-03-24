import React from 'react';

class Movie extends React.Component {
  render() {
    return (
      <>
        <p>{this.props.movie.data.title}</p>
        <p>{this.props.movie.data.overview}</p>
      </>

    )
  }
}

export default Movie;
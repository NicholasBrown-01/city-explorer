import React from 'react';
import Movie from './Movie';


class Movies extends React.Component {
  render(){
    console.log(this.props.movieData);
    return(
      <>
        <h3>Movie Info:</h3>
        <div>{this.props.movieData.map(movie => <Movie movie={movie} /> )}
        </div>
      </>
    )
  }
}


export default Movies;
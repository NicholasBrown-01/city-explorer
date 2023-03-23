import React from 'react';


class Movies extends React.Component {
  render(){
    console.log(this.props.movieData);
    return(
      <>
        <h3>Movie Info:</h3>

        {this.props.movieData.map((data, indx) => {
          return(
            <div key={indx}>
            <p>{data.data.title}</p>
            <p>{data.data.overview}</p>
            </div>
          )
        })}
      </>
    )
  }
}


export default Movies;
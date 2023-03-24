import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <>
        <p>{this.props.day.date}</p>
        <p>{this.props.day.description}</p>      
      </>
    )
  }
}

export default WeatherDay;
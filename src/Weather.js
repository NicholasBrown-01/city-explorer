import React from 'react';
import WeatherDay from './WeatherDay';


class Weather extends React.Component {
  render(){
    return(
      <>
        
          <h3>Daily Weather</h3>
        <div>
          {this.props.weatherData.map(day => <WeatherDay day={day} /> )}
        </div>
      </>
    )
  }
}


export default Weather;
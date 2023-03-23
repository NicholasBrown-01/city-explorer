import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import Weather from './Weather'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // *** Use axios to get the data from LocationIQ - using city in state ***
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      // *** Set State with the data that comes back from axios & set error boolean to false ***
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      // *** Call Weather Handles ***
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      
      this.handleGetWeather(lat, lon);

    } catch (error) {

      // *** Set state with the error boolean and the error message ***
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  // *** Create connection for frontend to backend for Weather *** //
  handleGetWeather = async (lat, lon) => {
    try {

      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lan=${lon}`;

      let weatherDataFromAxios = await axios.get(url);
       
      console.log('Weather: ' + weatherDataFromAxios.data);

      this.setState({
        weatherData: weatherDataFromAxios.data
      })

    } catch (error) {
        console.log(error.message);
    }
  }

  render() {
    return (
      <>
        <h1>ENTER A CITY TO SEARCH FOR</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <div>{this.state.cityData.display_name}
                <ul>
                  <img src={`https://tiles.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400`} alt="Map of the city" /><br></br>
                  {this.state.cityData.lat}
                  {this.state.cityData.lon}
                </ul>
                <Weather weatherData={this.state.weatherData}/>
              </div>
              

        }
      </>
    )
  }
}

export default App;

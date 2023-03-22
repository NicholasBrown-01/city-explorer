import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';


//Access Token:pk.1bdaa9a4a72d772959ed56f56c24f01e


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  // *** Create connection for frontend to backend for Weather *** //
  handleWeather = async (event) => {
    event.preventDefault();
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchquery=${this.state.city}`
      let cityData = await axios.get(url);
      this.setState({
        weatherData: weatherData.data,
        error: false
      });
    } catch (error) {

      // TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  }


      getCityData = async (event) => {
        event.preventDefault();

        try {
          // TODO: Use axios to get the data from LocationIQ - using city in state
          let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

          let cityDataFromAxios = await axios.get(url);

          console.log(cityDataFromAxios.data[0])

          // TODO: Set State with the data that comes back from axios & set error boolean to false
          this.setState({
            cityData: cityDataFromAxios.data[0],
            error: false
          });

        } catch (error) {

          // TODO: Set state with the error boolean and the error message
          this.setState({
            error: true,
            errorMessage: error.message
          })
        }

      }

      // *** MAP PORTION OF YOUR LAB IMG SRC POINTS TO THIS URL: 
      // *** https://maps.locationiq.com/v3/staticmap?key=<YOUR API KEY>&center=<CITY'S LAT>,<CITY'S LON>&zoom=13

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

            {/* https://tiles.locationiq.com/v3/<theme>/<type>.json?key=<access_token> */}

            {
              this.state.error
                ? <p>{this.state.errorMessage}</p>
                : <p>{this.state.cityData.display_name}
                  <ul>
                    <img src={`https://tiles.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400`} alt="Map of the city" /><br></br>
                    {this.state.cityData.lat} {this.state.cityData.lon}
                  </ul>
                </p>
            }
          </>
        )
      }
    }
    
    export default App;

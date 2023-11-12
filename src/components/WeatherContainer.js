import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '5851652f2f5da157701707dfc5f5b0f6'; // Replace with your actual OpenWeatherMap API key
  const latitude = '14.6091';
  const longitude = '121.0223';

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error.response || error.message || error);
        setWeatherData(null); // Set weatherData to null in case of an error
      });
  }, []);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View style={styles.weatherContainer}>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>
              {kelvinToCelsius(weatherData.main.temp).toFixed(1)} °C
            </Text>
            <Text style={styles.location}>Location: {weatherData.name}</Text>
            <Text style={styles.weatherCondition}>
              Weather: {weatherData.weather[0].main}
            </Text>
            <Text style={styles.weatherDescription}>
              Description: {weatherData.weather[0].description}
            </Text>
            <Text style={styles.humidity}>
              Humidity: {weatherData.main.humidity}%
            </Text>
            {/* You can display more weather data here */}
          </View>
          <View style={styles.weatherIconContainer}>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
              }}
            />
          </View>
        </View>
      ) : (
        <Text>Error loading weather data or no data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0077B6'
  },
  weatherInfo: {
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  weatherCondition: {
    fontSize: 16,
    color: 'white'
  },
  weatherDescription: {
    fontSize: 16,
    color: 'white'
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  humidity: {
    fontSize: 16,
    color: 'white'
  },
  weatherIconContainer: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});

export default WeatherContainer;
import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Image
} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = '1e09946c5d0349d1a93191514242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Weather App! ☀️</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your location"
        value={city}
        onChangeText={text => {
          setCity(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.weatherText}>Get Weather</Text>
      </TouchableOpacity>
      {error && (
        <Text>{error}</Text>
      )}
      {weatherData && (
        <View style={styles.dataContainer}>
          <Text style={styles.txtcity}>Ciudad: {weatherData.location.name}</Text>
          <Text style={styles.txttemp}>Temperatura: {weatherData.current.temp_c}</Text>
          <Image source={{ url: weatherData.current.icon }} style={styles.image} />
          <Text style={styles.txtdes}>Descripcion: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'black'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white'
  },
  textInput: {
    borderWidth: 1,
    backgroundColor:'white',
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: '22%',
    width: 250,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#9b59b6',
    width: 250,
    height: 35,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '22%',
  },
  weatherText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  dataContainer:{
    width:250,
    height:270,
    margin:30,
    borderWidth:1.5,
    borderColor:'#211326',
    padding:20,
    marginLeft:'22%',
    borderRadius:25,
    backgroundColor:'#9b59b6',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  image:{
    width:75,
    height:75,
  },
  txtcity:{
    fontSize:22,
    fontWeight:'bold',
    color:'white'
  },
  txttemp:{
    fontSize:20,
    color:'white'
  },
  txtdes:{
    fontSize:18,
    color:'white'
  }
});
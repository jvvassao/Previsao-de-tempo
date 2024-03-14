const weatherConditions = {
  'Clear': 'Ensolarado',
  'Clouds': 'Nublado',
  'Rain': 'Chuvoso',
  'Mist': 'Nevoa'
};

function getWeather() {
  var city = document.getElementById('cityInput').value.trim(); // Trim whitespace from input
  // Check if the input is a number
  if (!isNaN(city)) {
    var weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = 'Por favor, insira o nome de uma cidade válido.';
    return; // Exit the function if input is a number
  }
  
  var apiKey = 'cebcd482eda57fa9a6714c1c2ba91885';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var weatherInfo = document.getElementById('weatherInfo');

      if (data.cod === 200) {
        var condition = data.weather[0].main;
        var translatedCondition = weatherConditions[condition] || condition;

        weatherInfo.innerHTML = 'Cidade: ' + data.name + '<br>' +
          'Temperatura: ' + data.main.temp + '°C<br>' +
          'Condição: ' + translatedCondition;
      } else {
        // Exibir mensagem de erro em português
        weatherInfo.innerHTML = 'Cidade não encontrada';
      }
    })
    .catch(error => {
      console.log('Erro:', error);
      // Exibir mensagem de erro em português em caso de falha na requisição
      var weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML = 'Erro na requisição. Tente novamente mais tarde.';
    });
}

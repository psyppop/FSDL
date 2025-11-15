// API Keys - Make sure to replace these with your own keys
const weatherApiKey = '78d3e81e-711b-40fb-9b1b-6b69d9d7fb02'  // Replace with your OpenWeatherMap API key
const aqiApiKey = 'YOUR_AQI_API_KEY';  // Replace with your AQICN API key
const newsApiKey = 'YOUR_NEWS_API_KEY';  // Replace with your NewsAPI key

// Carbon Footprint Calculator
document.getElementById('carbonForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Input values
  const miles = parseFloat(document.getElementById('miles').value);
  const electricity = parseFloat(document.getElementById('electricity').value);
  const plastic = parseFloat(document.getElementById('plastic').value);

  // Error handling
  if (isNaN(miles) || isNaN(electricity) || isNaN(plastic)) {
    alert('Please enter valid numbers for all fields.');
    return;
  }

  // Carbon footprint calculation (simplified)
  const carbonFootprint = (miles * 0.4) + (electricity * 0.6) + (plastic * 2);
  document.getElementById('result').innerText = `Your estimated carbon footprint is ${carbonFootprint.toFixed(2)} kg CO2 per month.`;
});

// Sustainability Tips
const tips = [
  "Use reusable bags instead of plastic bags.",
  "Switch to LED bulbs to save energy.",
  "Reduce water usage by fixing leaks.",
  "Recycle paper, glass, and metal.",
  "Compost organic waste to reduce landfill use."
];

const tipList = document.getElementById('tipList');
tips.forEach(tip => {
  const li = document.createElement('li');
  li.textContent = tip;
  tipList.appendChild(li);
});

// Goal Tracker
document.getElementById('goalForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const goal = document.getElementById('goal').value;
  const targetDate = document.getElementById('targetDate').value;

  // Date validation
  const today = new Date();
  const selectedDate = new Date(targetDate);
  if (selectedDate <= today) {
    alert('Please select a future date for your goal.');
    return;
  }

  // Add goal to list
  const goalList = document.getElementById('goalList');
  const li = document.createElement('li');
  li.textContent = `${goal} (Target Date: ${targetDate})`;
  goalList.appendChild(li);

  // Clear form
  document.getElementById('goalForm').reset();
});

// Fetch weather and AQI data for Mumbai
async function fetchWeatherAndAQI() {
  try {
    // Fetch weather info from OpenWeatherMap (Mumbai, India)
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherResponse.json();
    if (weatherData.cod !== 200) {
      throw new Error('Weather data not found');
    }
    const temperature = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;

    // Fetch AQI data from AQICN (Mumbai, India)
    const aqiResponse = await fetch(`https://api.waqi.info/feed/mumbai/?token=${aqiApiKey}`);
    const aqiData = await aqiResponse.json();
    if (aqiData.status !== "ok") {
      throw new Error('AQI data not found');
    }
    const aqi = aqiData.data.aqi;

    // Display weather and AQI
    document.getElementById('weather-info').innerText = `Temperature: ${temperature}°C, ${weatherDescription}`;
    document.getElementById('aqi').innerText = `AQI: ${aqi}`;
  } catch (error) {
    console.error('Error fetching weather and AQI data:', error);
    document.getElementById('weather-info').innerText = 'Failed to load weather data.';
    document.getElementById('aqi').innerText = 'Failed to load AQI data.';
  }
}

// Fetch latest news for India
async function fetchNews() {
  try {
    const newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsApiKey}`);
    const newsData = await newsResponse.json();
    const newsList = document.getElementById('news-list');

    // Clear previous news
    newsList.innerHTML = '';

    // Display the first 5 news articles
    newsData.articles.slice(0, 5).forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${article.title}</strong><br><a href="${article.url}" target="_blank">${article.source.name}</a>`;
      newsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '<li>Failed to load news.</li>';
  }
}

// Call the functions when the page loads
window.onload = function() {
  fetchWeatherAndAQI();
  fetchNews();
};

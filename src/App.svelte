<script lang="ts">
  import type { WeatherResult } from "./lib/weatherAPI";
  import { getWeather } from "./lib/weatherAPI";
  import { fly } from 'svelte/transition';

  let currentWeather: WeatherResult | null = null;
  let weatherVisible = false;
  const params = new URLSearchParams(window.location.search);
  let errorMessage = "";
  
  if (!params.has("lat") || !params.has("lon") || !params.has('units')) {
    errorMessage = "Missing required params";
  } else {
    getLatestAndShow();
  }

  async function getCurrentWeather() {
    try {
      currentWeather = await getWeather({
        latitude: Number(params.get("lat")),
        longitude: Number(params.get("lon")),
        weatherUnits: String(params.get("units")),
      });
    } catch (error) {
      errorMessage = error.message;
    }
  }
  
  async function getLatestAndShow() {
    if (!weatherVisible) {
      await getCurrentWeather();
      weatherVisible = true;
      setTimeout(getLatestAndShow, 10 * 1000);
    } else {
      weatherVisible = false;
      setTimeout(getLatestAndShow, 60 * 1000);
    }
  }
  
</script>

<main>
  {#if errorMessage}
    <div class="errorMsg">{errorMessage}</div>
  {/if}
  {#if currentWeather && weatherVisible}
    <div class="container" transition:fly="{{ x: -600, duration: 2000 }}">
      <div class="background"></div>
      <div class="symbol-container">
        <!-- TODO : Find better ALT text-->
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.symbol_code}@2x.png`} alt={`${currentWeather.description}`}
        />
      </div>
      <div class="temperature">
        {currentWeather.temperature.local}<span class="unit">{currentWeather.temperature.symbol}</span>
      </div>
      <div class="wind">
        <div class="wind-direction" style:transform={`rotate(${currentWeather.wind_from_direction}deg)`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-wind-icon">
            <path d="M19.3,8.7c0.8,0.8,0.8,2,0,2.8c-0.8,0.8-2,0.8-2.8,0c-0.4-0.4-0.6-0.9-0.6-1.4v-8 M4.5,8.7  c-0.8,0.8-0.8,2,0,2.8c0.8,0.8,2,0.8,2.8,0c0.4-0.4,0.6-0.9,0.6-1.4v-8 M11.9,19.6V2.1"/>
            <line x1="11.9" y1="7.9" x2="11.9" y2="21.9"/>
            <polyline points="18.9,14.9 11.9,21.9 4.9,14.9 "/>
          </svg>
        </div>
        <div class="wind-speed">
          {currentWeather.wind_speed}{currentWeather.wind_unit}
        </div>
      </div>
      <div class="credit">
        Data from OpenWeatherMap
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20vmin;
    color: white;
    font-weight: 800;
  }

  .temperature {
    text-align: center;
    line-height: 18vmin;
    font-size: 16vmin;
  }

  .container {
    width: 55vmin;
    position: relative;
    padding-top: 1vmin;
    padding-left: 4vmin;
    padding-right: 4vmin;
    padding-bottom: 3vmin;
  }

  .background {
    position: absolute;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.7);
  }

  .symbol-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .symbol-container img {
    width: 50%;
    filter: drop-shadow(10px 10px 10px black);
  }

  .wind {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2vmin;
  }

  .arrow-wind-icon {
    width: 11vmin;
    height: 11vmin;
  }

  .wind-direction {
    display: inline-flex;
    transform-origin: center;
    justify-content: center;
    align-items: flex-end;
  }

  .wind-speed {
    margin-left: 2vmin;
    font-size: 6vmin;
  }

  .unit {
    margin-left: 2vmin;
    font-size: 8vmin;
  }

  .credit {
    margin-top: 2vmin;
    font-size: 2vmin;
    font-style: italic;
    text-align: center;
    font-weight: 200;
  }
</style>

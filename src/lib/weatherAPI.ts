import type { Root } from "../interfaces/WeatherResponse";
interface GetWeatherOptions {
  latitude: number;
  longitude: number;
  weatherUnits: string;
}

export interface WeatherResult {
  symbol_code: string;
  wind_from_direction: number;
  wind_speed: number;
  wind_unit: string;
  temperature: {
    local: number | String;
    symbol: string,
  },
}

let lastResult: WeatherResult | null = null;
let lastFetchDate: number | null = null;
let cacheTime = 35 * 60 * 1000;

export async function getWeather({
  latitude,
  longitude,
  weatherUnits,
}: GetWeatherOptions): Promise<WeatherResult> {
  if (lastResult && (Date.now() < lastFetchDate + (cacheTime))) {
    return lastResult;
  }
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_APPID}&units=${weatherUnits}`);
  if (response.ok) {
    const data = (await response.json()) as Root;
    const temperatureLocal: number = data?.main?.temp;
    const temperatureSymbol: string = weatherUnits == 'imperial' ? '°F' : '°C';
    const windSpeed: number = weatherUnits == 'imperial' ? data?.wind?.speed.toFixed(1) : Math.floor(data?.wind?.speed * 2.2369362921).toFixed(1);
    lastResult = {
      symbol_code: data.weather[0].icon,
      wind_from_direction: data?.wind?.deg,
      wind_speed: windSpeed,
      wind_unit: "mph",
      temperature: {
        local: temperatureLocal.toFixed(1),
        symbol: temperatureSymbol,
      },
    };
    lastFetchDate = Date.now();
    return lastResult;
  }
  throw new Error(response.statusText);
}
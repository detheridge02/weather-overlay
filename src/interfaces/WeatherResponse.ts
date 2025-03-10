export interface Root {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  snow?: Snow;
  clouds?: Clouds;
  dt: number;
  sys: Sys;
  timezone: Timezone;
}
export interface Coord {
  lat: number;
  lon: number;
}
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
export interface Wind {
  speed: number;
  deg: number;
  gust: number; 
}
export interface Rain {
  '1hr': Number;
}
export interface Snow {
  '1hr': Number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface Timezone {
  timezone: number;
  id: number;
  name: String;
  cod: number;
}

# Weather Overlay

An overlay that shows the current weather of a give latitude and longitude:

https://weather-overlay.surge.sh/?lat=39.704555&lon=-105.087551

* Weather Data provided by [MET Norway](https://api.met.no/)
* Icons provided by [nrkno/yr-weather-symbols](https://github.com/nrkno/yr-weather-symbols)

##.env file contents##
```
VITE_APPID={your API key from openweathermaps.org
VITE_API=WeatherAPI // For future use
```

```sh
npm i
npm run dev
```

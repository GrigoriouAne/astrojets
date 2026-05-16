import { useEffect, useMemo, useState } from "react";
import styles from "./rideForecastSection.module.css";
import sunnyToby from "../../assets/images/weather/sunny-toby.png";
import partlyCloudyToby from "../../assets/images/weather/partly-cloudy-toby.png";
import cloudyToby from "../../assets/images/weather/cloudy-toby.png";
import windyToby from "../../assets/images/weather/windy-toby.png";
import rainyToby from "../../assets/images/weather/rainy-toby.png";

const WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=40.8389&longitude=24.3032&current_weather=true&hourly=weather_code,temperature_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5";

const getWeatherGroup = (weatherCode, windSpeed, precipitation) => {
  const rainyCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  const cloudyCodes = [3, 45, 48];
  const partlyCloudyCodes = [1, 2];

  if (rainyCodes.includes(weatherCode) || precipitation >= 1.5) {
    return "rainy";
  }

  if (windSpeed >= 35 && !rainyCodes.includes(weatherCode)) {
    return "windy";
  }

  if (weatherCode === 0) {
    return "sunny";
  }

  if (partlyCloudyCodes.includes(weatherCode)) {
    return "partly-cloudy";
  }

  if (cloudyCodes.includes(weatherCode)) {
    return "cloudy";
  }

  return "cloudy";
};

const getMiddayHourlyData = (hourly, dateString) => {
  const targetHours = [`${dateString}T12:00`, `${dateString}T13:00`, `${dateString}T14:00`];

  for (const target of targetHours) {
    const index = hourly.time.indexOf(target);
    if (index !== -1) {
      return {
        weatherCode: hourly.weather_code[index],
        temperature: hourly.temperature_2m[index],
        windSpeed: hourly.wind_speed_10m[index],
        precipitation: hourly.precipitation[index],
      };
    }
  }

  return null;
};

const weatherVisualMap = {
  sunny: {
    image: sunnyToby,
    label: "Sunny",
    status: "Perfect ride day",
    themeClass: "sunnyCard",
  },
  "partly-cloudy": {
    image: partlyCloudyToby,
    label: "Partly cloudy",
    status: "Great for a ride",
    themeClass: "partlyCloudyCard",
  },
  cloudy: {
    image: cloudyToby,
    label: "Cloudy",
    status: "Beautifully clouded",
    themeClass: "cloudyCard",
  },
  windy: {
    image: windyToby,
    label: "Windy",
    status: "Windy conditions",
    themeClass: "windyCard",
  },
  rainy: {
    image: rainyToby,
    label: "Rainy",
    status: "Better check before booking",
    themeClass: "rainyCard",
  },
};

const getDayLabel = (dateString, index) => {
  if (index === 0) return "Today";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const RideForecastSection = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setHasError(false);

        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        const daily = data.daily;
        const hourly = data.hourly;
        const currentWeather = data.current_weather;

        const forecastData = daily.time.map((date, index) => {
          const isToday = index === 0;
          const middayData = getMiddayHourlyData(hourly, date);

          const weatherCode = isToday
            ? currentWeather.weathercode
            : middayData?.weatherCode ?? 3;

          const maxTemp = Math.round(daily.temperature_2m_max[index]);
          const minTemp = Math.round(daily.temperature_2m_min[index]);

          const windSpeed = isToday
            ? Math.round(currentWeather.windspeed)
            : Math.round(middayData?.windSpeed ?? 0);

          const precipitation = isToday
            ? 0
            : middayData?.precipitation ?? 0;

          const group = getWeatherGroup(weatherCode, windSpeed, precipitation);
          const visual = weatherVisualMap[group];

          return {
            date,
            dayLabel: getDayLabel(date, index),
            maxTemp,
            minTemp,
            windSpeed,
            precipitation,
            ...visual,
          };
        });

        setForecast(forecastData);
      } catch (error) {
        console.error("Ride forecast error:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return <p className={styles.message}>Loading ride forecast...</p>;
    }

    if (hasError) {
      return (
        <p className={styles.message}>
          Ride forecast is temporarily unavailable.
        </p>
      );
    }

    return (
      <div className={styles.cardsScroller}>
        <div className={styles.cardsGrid}>
          {forecast.map((day) => (
            <article 
              key={day.date} 
              className={`${styles.card} ${styles[day.themeClass]}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.day}>{day.dayLabel}</span>
                <span className={styles.condition}>{day.label}</span>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  src={day.image}
                  alt={`${day.label} Toby forecast`}
                  className={styles.weatherImage}
                />
              </div>

              <div className={styles.tempRow}>
                <span className={styles.maxTemp}>{day.maxTemp}°</span>
                <span className={styles.separator}>/</span>
                <span className={styles.minTemp}>{day.minTemp}°</span>
              </div>

              <p className={styles.status}>{day.status}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }, [forecast, loading, hasError]);

  return (
    <section id="rideForecast" className={styles.container}>
      <h2 className={styles.title}>Ride Forecast</h2>
      {content}
    </section>
  );
};

export default RideForecastSection;
import { showWeatherApp } from "./main/showWeatherApp";
import { showErrorPage } from "./main/showErrorPage";
import "./styles/style.css";

(async () => {
  const element = document.querySelector(".weather-app");
  try {
    await showWeatherApp(element);
  } catch (err) {
    showErrorPage(element);
    console.error(err);
  }
})();

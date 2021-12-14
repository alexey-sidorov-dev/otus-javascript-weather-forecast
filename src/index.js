import { showWeatherPage } from "./main/showWeatherPage";
import { showErrorPage } from "./main/showErrorPage";
import "modern-css-reset";
import "./styles/style.css";

(async () => {
  const element = document.querySelector(".main-app");
  try {
    await showWeatherPage(element);
  } catch (err) {
    showErrorPage(element);
    console.error(err);
  }
})();

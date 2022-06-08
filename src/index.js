import { runApp } from "./app/runApp";
import "modern-css-reset";
import "./styles/style.css";

(async () => {
  const app = document.querySelector("#app");
  await runApp(app);
})();

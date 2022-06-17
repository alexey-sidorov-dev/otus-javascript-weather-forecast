import { runApp } from "./app/runApp";
import "modern-css-reset";
import "./styles/style.scss";

(async () => {
  const app = document.querySelector("#app");
  await runApp(app);
})();

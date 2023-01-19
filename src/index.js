import { App } from "./app/App";
import "modern-css-reset";
import "./styles/style.scss";

(async () => {
  const root = document.getElementById("app");
  const app = new App(root);
  if (root) {
    await app.run(root);
  }
})();

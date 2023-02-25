import "modern-css-reset";
import "./styles/style.scss";
import { App } from "./components/App";

(async () => {
  const root = document.getElementById("app");

  if (root) {
    /* eslint-disable-next-line no-new */
    new App(root);
  }
})();

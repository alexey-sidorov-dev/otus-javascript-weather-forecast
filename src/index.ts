import "modern-css-reset";
import "./styles/style.scss";
import { AppComponent as App } from "./components/AppComponent";

(async () => {
  const root = document.getElementById("app");

  if (root) {
    /* eslint-disable-next-line no-new */
    new App(root);
  }
})();

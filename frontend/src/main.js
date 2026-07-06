import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/reset.css";
import "./assets/styles/colors.css";
import "./assets/styles/layout.css";
import "./assets/styles/buttons.css";
import "./assets/styles/forms.css";
import "./assets/styles/tables.css";
import "./assets/styles/validation.css";

createApp(App)
  .use(router)
  .mount("#app");
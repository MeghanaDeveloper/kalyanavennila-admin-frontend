import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { myPersistor, Store } from "./redux/store/myStore.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={myPersistor}>
        <App />
        <Toaster position="top-right" />
      </PersistGate>
    </Provider>
  </StrictMode>
);

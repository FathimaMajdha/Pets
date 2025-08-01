import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store.jsx";
import { ContextProvider } from "./Features/ContextProvider.jsx"; 
import { AuthProvider } from "./Features/AuthContext.jsx";
import { LayoutProvider } from "./Features/LayoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <LayoutProvider>
        <ContextProvider> 
          <App />
        </ContextProvider>
      </LayoutProvider>
    </AuthProvider>
  </Provider>
);
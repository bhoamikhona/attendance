import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.js";

// axios.defaults.baseURL = "http://localhost:8000/api/v1";
// axios.defaults.baseURL = "https://attendance-p21a.onrender.com/api/v1"; // render
axios.defaults.baseURL =
  "https://attendance-production-c22e.up.railway.app/api/v1";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

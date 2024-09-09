import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store.js";
import { Provider } from "react-redux";


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
  </Provider>
)


/*
export async function checkSession() { 
  const response = await fetch('http://127.0.0.1:5000/check-session');
  console.log("log status--->" ,response.status)

  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response.json();


*/
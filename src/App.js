import React from 'react';
import style from './App.module.scss';
import {BrowserRouter} from "react-router-dom";
import Main from "./Components/Main"
function App() {
  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;

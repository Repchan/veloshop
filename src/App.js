import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';


import Page from "./components/Page";
function App() {
  return (
        <div className="App">
            <Page/>
        </div>
  );
}

export default App;

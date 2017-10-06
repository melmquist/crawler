import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/main/main.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Starter now, soon to be Crawler</h1>
        </header>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
        <div className="testyTest redBackground">
          hey
          <input></input>
        </div> 
      </div>
    );
  }
}

export default App;

/*
TODO: 
seperate/copy this root App comp into my own App comp so it's beautified

Input field takes URL --> FORM ELEMENT?

<p> tags or <table> below to display response to browser.


*/ 
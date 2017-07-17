import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import reactfusioncharts from 'react-fusioncharts';
import Home from './home/home.js';

charts(fusioncharts)

class App extends Component {
  render() {
    return (
      <Home/>
    );
  }
}


export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PDFWrapper from './PDFWrapper';
// import PDFPageViewer from './PDFPageViewer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PDFWrapper />
      </div>
    );
  }
}

export default App;

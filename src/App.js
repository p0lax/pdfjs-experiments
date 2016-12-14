import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './SearchPanel';
import PDFWrapper from './PDFWrapper';
import PDFPageViewer from './PDFPageViewer'

class App extends Component {

  componentDidMount() {
    window.addEventListener('click', (e) => {
      console.log('x', e.clientX, 'y', e.clientY);
    });
  }

  render() {
    return (
      <div className="App">
        <SearchPanel />
        <PDFPageViewer />
      </div>
    );
  }
}

export default App;

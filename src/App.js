import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  pageSize = 6;
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={4}
          />
          <Routes>
            <Route exact path="/" element={<News key="home" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='general' />} />
            <Route exact path="/business" element={<News key="business" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='business' />} />
            <Route exact path="/entertainment" element={<News key="entertainment" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='entertainment' />} />
            <Route exact path="/general" element={<News key="general" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='general' />} />
            <Route exact path="/health" element={<News key="health" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='health' />} />
            <Route exact path="/science" element={<News key="science" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='science' />} />
            <Route exact path="/sports" element={<News key="sports" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='sports' />} />
            <Route exact path="/technology" element={<News key="technology" apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
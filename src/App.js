import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

// RCC for class based snippet
const App = () => {

  const pagesize = 15
  const apiKey = process.env.API_KEY

  // for Top loading bar
  const [progress, setProgress] = useState(0)


  const stProgress = (progress) => {
    setProgress(progress)

  }


  return (
    <Router>

      <Navbar />

      <LoadingBar
        color='red'
        progress={progress}
        height={4}
      />

      <Routes>
        <Route exact path="/" element={<News key="general" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="General" />} />

        <Route exact path="/science" element={<News key="science" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Science" />} />
        <Route exact path="/business" element={<News key="business" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Business" />} />


        <Route exact path="/entertainment" element={<News key="entertainment" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Entertainment" />} />


        <Route exact path="/health" element={<News key="health" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Health" />} />


        <Route exact path="/sports" element={<News key="sports" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Sports" />} />


        <Route exact path="/technology" element={<News key="technology" setProgress={stProgress} apiKey={apiKey} pageSize={pagesize} country="in" category="Technology" />} />


      </Routes>
    </Router>
  );

}

export default App;


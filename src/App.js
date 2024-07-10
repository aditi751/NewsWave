import './App.css';

import React, {useState} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const [mode, setMode] = useState('light'); 
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  const toggleMode = () => {
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#232438';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

    return (
      <>
      <Router>
      <NavBar mode={mode} toggleMode={toggleMode}/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
      <div>
      <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country = "in" category="general" mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country = "in" category="business"  mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country = "in" category="entertainment"  mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country = "in" category="general"  mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country = "in" category="health" mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country = "in" category="science"  mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country = "in" category="sports"  mode={mode} toggleMode={toggleMode}/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country = "in" category="technology" mode={mode} toggleMode={toggleMode}/>}/>
      </Routes>
      </div>  
      </Router> 
      </>   
      );
  }
  
  export default App;
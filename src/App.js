// src/App.js
import React from 'react';
import MainPage from './components/main/mainPage.jsx';
function App() {

  document.title="TaskHive"
  return (
    <div className="App">
      {/* {console.log(`env variable is `,process.env.REACT_APP_PORT)} */}
      <MainPage />
      
    </div>
  );
}

export default App;

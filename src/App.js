import React from 'react';
import StudentProfiles from './components/StudentProfiles';
import {ApiDataContextProvider} from './data/ApiDataContext';

function App() {
  return (
    <ApiDataContextProvider>
      <div className="App">
        <StudentProfiles />
      </div>
    </ApiDataContextProvider>
  );
}

export default App;

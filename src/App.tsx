import React, { useState } from 'react';
import './App.css';
import Menu from './Menu/Menu'

import { TextField, Select } from './components/index.js'

function App() {

  const [component, setComponent] = useState("Select")

  return (
    <div className="App">
      <Menu component={component} setComponent={setComponent} />
      <div className="content">
        { 
          component === "TextField" &&  
          <TextField className={"custom class"} value={"Tim"} />
        }
        {
          component === "Select" &&
          <Select label={"Programs"}>check</Select>
        }
        
      </div>
      
    </div>
  );
}

export default App;

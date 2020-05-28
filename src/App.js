import React from "react"
import Tennis from "./components/Tennis"
import "./App.css"

import backgroundImage from "./tennis.jpg"

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="App-content">
        <Tennis />
      </div>
    </div>
  )
}

export default App

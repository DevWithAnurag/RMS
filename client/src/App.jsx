import React from 'react'
import Navbar from './components/navbar/navbar'
import Content from './components/content/content'
import './App.css'
const App = () => {
  return (
    <>
      <div className="bg">
        <div className="ellipse">
          <img src="src\assets\Ellipse.png" alt="" />
        </div>
        <div className=" ellipse-round">
          <img src="src\assets\round-Ellipse.png" alt="" />
        </div>
      </div>
      <Navbar />
      <Content />
    </>
  )
}

export default App

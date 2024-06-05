import React, { useState } from "react"
import Navbar from "./Components/Navbar"
import Newsboard from "./Components/Newsboard"


const App = () => {

  const [category,setCategory]=useState("general")

  return (
    <>
    <div className="bg-dark text-light">
    <Navbar setCategory={setCategory}/>
    <Newsboard category={category}/>
    </div>
    </>
  )
}

export default App
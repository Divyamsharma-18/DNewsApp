import React from 'react'
import Logo from '../assets/Logo.png'

const Navbar = ({setCategory}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <img src={Logo} width="240px" alt="App logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("technology")}>Technology</div>
            </li>
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("business")}>Business</div>
            </li>
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("health")}>Health</div>
            </li>
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("science")}>Science</div>
            </li>
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("sports")}>Sports</div>
            </li>
            <li className="nav-item">
              <div className="nav-link btn cursor-pointer" onClick={()=>setCategory("entertainment")}>Entertainment</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

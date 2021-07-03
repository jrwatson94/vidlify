import React from 'react';
import './Nav.css';



function Nav(props) {
  
    return (
      <nav id="vidlify-nav" className="navbar">
        <a className="navbar-brand" href="/">
          Vidlify
        </a>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload</button>
          <input 
            type="file"
            accept="video/*" 
            onChange={(e) => props.handleChange(e)}
        />
        </div>
      </nav>
    );
}

export default Nav;
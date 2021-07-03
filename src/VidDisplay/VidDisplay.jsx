import React, {useEffect} from 'react';

import './VidDisplay.css';

function VidDisplay(props) {
  
    console.log(props.video);
    return (

      <div className="VidDisplay">
        {props.video ? <video controls type="video/mp4" style={{ width: "30rem" }} src={props.video} /> : <span />}
      </div>
    );
}

export default VidDisplay;
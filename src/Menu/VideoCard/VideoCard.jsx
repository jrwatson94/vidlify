import React from 'react';
import './VideoCard.css';

function VideoCard(props) {
    return (
      <div className="VideoCard" onClick={(e) => props.videoClickHandler(e.target.innerText)}>
          <h5>{props.name}</h5>
      </div>
    );
}

export default VideoCard;
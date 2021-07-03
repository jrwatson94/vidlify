import React from 'react';
import './Menu.css';
import VideoCard from './VideoCard/VideoCard';

function Menu(props) {
    return (
      <div className="Menu">
        {props.videos ? 
          props.videos.map(vid => 
              <VideoCard name={vid.key} videoClickHandler={props.videoClickHandler}></VideoCard>
            )
            :
            <span></span>
        }
      </div>
    );
}

export default Menu;
import './App.css';
import React, {useState, useEffect} from 'react';
import Nav from './Nav/Nav';
import Menu from './Menu/Menu';
import VidDisplay from './VidDisplay/VidDisplay';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';



Amplify.configure(awsconfig);



function App() {
  const [fileName, setFileName]=useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVid, setCurrentVid] = useState(null);

  useEffect(() => {
    async function fetchVideos(){
      const vids = await Storage.list('',{ level: 'private' });
      setVideos(vids);

      const current = await Storage.get(vids[0].key, { level: 'private' });
      setCurrentVid(current);
    }
    fetchVideos();
  }, [fileName])
  

  const videoClickHandler = async (key) => {
    const current = await Storage.get(key, { level: 'private' });
    setCurrentVid(current);
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    try {
      // Upload the file to s3 with private access level. 
      await Storage.put(file.name, file, {
        level: 'private',
        contentType: 'video'
      });
      const current = await Storage.get(file.name, { level: 'private' });
      console.log(current);
      setCurrentVid(current);
      
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="App">
      <Nav handleChange={handleChange}/>
        <div className="row">
          <div className="col-4"><Menu videos={videos} videoClickHandler={videoClickHandler}/></div>
          <div className="col-8"><VidDisplay video={currentVid}/></div>
        </div>    
    </div>
  );
}

export default withAuthenticator(App);

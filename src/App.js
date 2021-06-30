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
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName]=useState(null);
  const [videos, setVideos] = useState([]);

  useEffect( async () => {
    const vids = await Storage.list('')
    setVideos(vids);
    console.log(vids)
  }, [fileName])
  
  
  const displayVidLinks = () =>{

    const clickHandler = async (key) => {
      const url = await Storage.get(key);
      setVideoUrl(url);
      setFileName(key);
    }
    
    return videos.map(vid => {
      return <a><li onClick={ () => clickHandler(vid.key)}>{vid.key}</li></a>
    })
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      // Upload the file to s3 with private access level. 
      await Storage.put(file.name, file, {
        level: 'public',
        contentType: 'video'
      });
      // Retrieve the uploaded file to display
      const url = await Storage.get(`${file.name}`)
      console.log(url)
      setFileName(file.name)
      setVideoUrl(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1>Welcome to Vidlify!</h1>
      <h1>My Videos</h1>
      <div id="vid-container">
        {displayVidLinks()}
      </div>
      <h1> Upload a Video </h1>
      {loading ? <h3>Uploading...</h3> : <input
        type="file" accept='video/*'
        onChange={(evt) => handleChange(evt)}
      />}
      <div>
        {videoUrl ? <video controls type="video/mp4" style={{ width: "30rem" }} src={videoUrl} /> : <span />}
      </div>
      <Nav />
      <Menu />
      <VidDisplay url={"most recent url"}/>
    </div>
  );
}

export default withAuthenticator(App);

import './App.css';
import Nav from './Nav/Nav'
import Menu from './Menu/Menu'
import VidDisplay from './VidDisplay/VidDisplay'


function App() {
  return (
    <div className="App">
      <h1>Welcome to Vidlify!</h1>
      <Nav />
      <Menu />
      <VidDisplay url={"most recent url"}/>
    </div>
  );
}

export default App;

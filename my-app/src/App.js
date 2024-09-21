import logo from './logo.svg';
import Dropdown from 'react-bootstrap/Dropdown'; //ladataan reackirjastoa 
import 'bootstrap/dist/css/bootstrap.min.css'; // tyylikirjasto
import DropdownButton from 'react-bootstrap/DropdownButton';
import './App.css';
import Countries from "./countries";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="../kuvat/banner.png" alt="Logo kuvaileva teksti" className="banner" />

        <Countries />



      </header>
    </div>
  );
}

export default App;

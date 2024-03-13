import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Login';
import EmptyRoute from './NoPage/EmptyRoute';
import AboutFolder from './About/About';
import HomeFolder from './Home/HomeFolder';
import { Route, Routes } from 'react-router-dom';
import RouteFolder from './Routes/RouteFolder';

function App() {
  return (
    <div className="App">
   <RouteFolder/>
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteState from './Context/notes/NoteState';
import AlertState from './Context/alert/AlertState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";

function App() {
  
  return (
    <>
    <NoteState>
      <AlertState>
    <Router basename='/NoteMe'>
     <Navbar/>
     <div className="container">
      <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/about' element = {<About/>}/>
      <Route exact path='/login' element = {<Login/>}/>
      <Route exact path='/signup' element = {<SignUp/>}/>
     </Routes>
     </div>
    </Router>
      </AlertState>
    </NoteState>
    </>
  );
}

export default App;
